import { registerSW } from 'virtual:pwa-register';

type SwUpdateState = {
	updateAvailable: boolean;
};

type SwUpdateListener = (state: SwUpdateState) => void;

let needRefresh = false;
let updateSW: ((reloadPage?: boolean) => Promise<void>) | null = null;
const listeners = new Set<SwUpdateListener>();

function notifyListeners(): void {
	const state: SwUpdateState = { updateAvailable: needRefresh };
	for (const listener of listeners) {
		listener(state);
	}
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
	});
}

/** Активирует waiting worker и перезагружает страницу (skipWaiting через messageSkipWaiting). */
export function applySwUpdate(): void {
	if (updateSW) {
		void updateSW(true);
	}
}

/** Подписка на состояние обновления SW; возвращает функцию отписки. */
export function subscribeSwUpdate(listener: SwUpdateListener): () => void {
	listeners.add(listener);
	listener({ updateAvailable: needRefresh });

	return () => {
		listeners.delete(listener);
	};
}

/** Сброс состояния — только для unit-тестов. */
export function resetSwUpdateControllerForTests(): void {
	needRefresh = false;
	updateSW = null;
	listeners.clear();
}
