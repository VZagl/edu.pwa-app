import { registerSW } from 'virtual:pwa-register';

type SwUpdateState = {
	updateAvailable: boolean;
	isApplying: boolean;
};

type SwUpdateListener = (state: SwUpdateState) => void;

/** Минимальный интервал между проверками update() (visibility/focus/online). */
const CHECK_THROTTLE_MS = 30_000;
/** Периодическая проверка SW (как в доке vite-plugin-pwa). */
const PERIODIC_INTERVAL_MS = 60 * 60 * 1000;

let needRefresh = false;
let isApplying = false;
let updateSW: ((reloadPage?: boolean) => Promise<void>) | null = null;
let registration: ServiceWorkerRegistration | null = null;
let swUrl: string | null = null;
let lastCheckAt = 0;
let checkIntervalId: ReturnType<typeof setInterval> | null = null;
let proactiveCleanup: (() => void) | null = null;
const listeners = new Set<SwUpdateListener>();

function getState(): SwUpdateState {
	return { updateAvailable: needRefresh, isApplying };
}

function notifyListeners(): void {
	const state = getState();
	for (const listener of listeners) {
		listener(state);
	}
}

function cleanupProactiveChecks(): void {
	if (proactiveCleanup) {
		proactiveCleanup();
		proactiveCleanup = null;
	}
	if (checkIntervalId !== null) {
		clearInterval(checkIntervalId);
		checkIntervalId = null;
	}
}

/** Проверка новой версии SW с throttle и optional no-store fetch. */
async function checkForSwUpdate(): Promise<void> {
	if (!registration || registration.installing) {
		return;
	}
	if (!navigator.onLine) {
		return;
	}

	const now = Date.now();
	if (now - lastCheckAt < CHECK_THROTTLE_MS) {
		return;
	}
	lastCheckAt = now;

	try {
		if (swUrl) {
			const resp = await fetch(swUrl, {
				cache: 'no-store',
				headers: {
					cache: 'no-store',
					'cache-control': 'no-cache',
				},
			});
			if (resp?.status !== 200) {
				return;
			}
		}
		await registration.update();
	} catch {
		// сеть / CDN недоступны — следующая проверка по событию или интервалу
	}
}

function setupProactiveChecks(): void {
	cleanupProactiveChecks();

	const onVisibilityChange = (): void => {
		if (document.visibilityState === 'visible') {
			void checkForSwUpdate();
		}
	};
	const onFocus = (): void => {
		void checkForSwUpdate();
	};
	const onOnline = (): void => {
		void checkForSwUpdate();
	};

	document.addEventListener('visibilitychange', onVisibilityChange);
	window.addEventListener('focus', onFocus);
	window.addEventListener('online', onOnline);

	checkIntervalId = setInterval(() => {
		void checkForSwUpdate();
	}, PERIODIC_INTERVAL_MS);

	proactiveCleanup = () => {
		document.removeEventListener('visibilitychange', onVisibilityChange);
		window.removeEventListener('focus', onFocus);
		window.removeEventListener('online', onOnline);
	};
}

/**
 * Инициализирует регистрацию SW через vite-plugin-pwa (registerType: 'prompt').
 * При waiting worker вызывает onNeedRefresh — UI показывает баннер обновления.
 * В dev SW отключён — срабатывает после production-сборки (preview/deploy).
 */
export function initSwUpdate(): void {
	if (!('serviceWorker' in navigator)) {
		return;
	}

	updateSW = registerSW({
		immediate: true,
		onNeedRefresh() {
			needRefresh = true;
			notifyListeners();
		},
		onRegisteredSW(url, reg) {
			swUrl = url;
			registration = reg ?? null;
			if (registration) {
				setupProactiveChecks();
			}
		},
	});
}

/**
 * Активирует waiting worker и перезагружает страницу (skipWaiting через messageSkipWaiting).
 * Повторные вызовы игнорируются (in-flight), пока страница не перезагрузится.
 */
export function applySwUpdate(): void {
	if (isApplying || !updateSW) {
		return;
	}
	isApplying = true;
	notifyListeners();
	void updateSW(true);
}

/** Подписка на состояние обновления SW; возвращает функцию отписки. */
export function subscribeSwUpdate(listener: SwUpdateListener): () => void {
	listeners.add(listener);
	listener(getState());

	return () => {
		listeners.delete(listener);
	};
}

/** Сброс состояния — только для unit-тестов. */
export function resetSwUpdateControllerForTests(): void {
	cleanupProactiveChecks();
	needRefresh = false;
	isApplying = false;
	updateSW = null;
	registration = null;
	swUrl = null;
	lastCheckAt = 0;
	listeners.clear();
}
