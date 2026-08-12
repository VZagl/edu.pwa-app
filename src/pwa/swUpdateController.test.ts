import type { RegisterSWOptions } from 'vite-plugin-pwa/types';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
	const updateSWFn = vi.fn().mockResolvedValue(undefined);
	let capturedOptions: RegisterSWOptions | undefined;

	const registerSW = vi.fn((options?: RegisterSWOptions) => {
		capturedOptions = options;
		return updateSWFn;
	});

	return { registerSW, updateSWFn, getOptions: () => capturedOptions };
});

vi.mock('virtual:pwa-register', () => ({
	registerSW: mocks.registerSW,
}));

import {
	applySwUpdate,
	initSwUpdate,
	resetSwUpdateControllerForTests,
	subscribeSwUpdate,
} from './swUpdateController.ts';

type MockWorker = {
	state: string;
	addEventListener: ReturnType<typeof vi.fn>;
	removeEventListener: ReturnType<typeof vi.fn>;
	dispatchStateChange: (newState: string) => void;
};

function createMockInstallingWorker(initialState = 'installing'): MockWorker {
	const listeners = new Map<string, Set<() => void>>();

	const worker: MockWorker = {
		state: initialState,
		addEventListener: vi.fn((event: string, handler: () => void) => {
			if (!listeners.has(event)) {
				listeners.set(event, new Set());
			}
			listeners.get(event)!.add(handler);
		}),
		removeEventListener: vi.fn((event: string, handler: () => void) => {
			listeners.get(event)?.delete(handler);
		}),
		dispatchStateChange(newState: string) {
			worker.state = newState;
			listeners.get('statechange')?.forEach((handler) => {
				handler();
			});
		},
	};

	return worker;
}

type MockRegistration = ServiceWorkerRegistration & {
	dispatchUpdateFound: () => void;
	setInstalling: (worker: MockWorker | null) => void;
};

function createMockRegistration(installing: MockWorker | null = null): MockRegistration {
	const listeners = new Map<string, Set<() => void>>();
	let currentInstalling = installing;

	const registration = {
		get installing() {
			return currentInstalling as unknown as ServiceWorker | null;
		},
		update: vi.fn().mockResolvedValue(undefined),
		addEventListener: vi.fn((event: string, handler: () => void) => {
			if (!listeners.has(event)) {
				listeners.set(event, new Set());
			}
			listeners.get(event)!.add(handler);
		}),
		removeEventListener: vi.fn((event: string, handler: () => void) => {
			listeners.get(event)?.delete(handler);
		}),
		dispatchUpdateFound() {
			listeners.get('updatefound')?.forEach((handler) => {
				handler();
			});
		},
		setInstalling(worker: MockWorker | null) {
			currentInstalling = worker;
		},
	};

	return registration as unknown as MockRegistration;
}

const idleState = {
	updateAvailable: false,
	isApplying: false,
	isDownloading: false,
	downloadProgress: null,
};

describe('swUpdateController', () => {
	beforeEach(() => {
		resetSwUpdateControllerForTests();
		mocks.registerSW.mockClear();
		mocks.updateSWFn.mockClear();
		vi.stubGlobal('navigator', { serviceWorker: {}, onLine: true });
	});

	afterEach(() => {
		resetSwUpdateControllerForTests();
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it('должен зарегистрировать SW через virtual:pwa-register при поддержке браузером', () => {
		initSwUpdate();

		expect(mocks.registerSW).toHaveBeenCalledOnce();
		expect(mocks.getOptions()?.immediate).toBe(true);
		expect(mocks.getOptions()?.onNeedRefresh).toBeTypeOf('function');
		expect(mocks.getOptions()?.onRegisteredSW).toBeTypeOf('function');
	});

	it('не должен вызывать registerSW, если Service Worker не поддерживается', () => {
		vi.stubGlobal('navigator', {});

		initSwUpdate();

		expect(mocks.registerSW).not.toHaveBeenCalled();
	});

	it('должен уведомить подписчиков при onNeedRefresh', () => {
		const listener = vi.fn();

		initSwUpdate();
		subscribeSwUpdate(listener);
		listener.mockClear();

		mocks.getOptions()?.onNeedRefresh?.();

		expect(listener).toHaveBeenCalledWith({
			updateAvailable: true,
			isApplying: false,
			isDownloading: false,
			downloadProgress: null,
		});
	});

	it('должен сразу сообщить текущее состояние новому подписчику', () => {
		const listener = vi.fn();

		initSwUpdate();
		mocks.getOptions()?.onNeedRefresh?.();

		subscribeSwUpdate(listener);

		expect(listener).toHaveBeenCalledWith({
			updateAvailable: true,
			isApplying: false,
			isDownloading: false,
			downloadProgress: null,
		});
	});

	it('должен вернуть isDownloading: false и downloadProgress: null по умолчанию', () => {
		const listener = vi.fn();

		initSwUpdate();
		subscribeSwUpdate(listener);

		expect(listener).toHaveBeenCalledWith(idleState);
	});

	it('должен выставить isDownloading при updatefound / installing', async () => {
		const listener = vi.fn();
		const worker = createMockInstallingWorker('installing');
		const registration = createMockRegistration(null);

		initSwUpdate();
		subscribeSwUpdate(listener);
		listener.mockClear();

		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);

		registration.setInstalling(worker);
		registration.dispatchUpdateFound();

		expect(listener).toHaveBeenCalledWith({
			updateAvailable: false,
			isApplying: false,
			isDownloading: true,
			downloadProgress: null,
		});
	});

	it('должен отслеживать уже installing worker при onRegisteredSW', async () => {
		const listener = vi.fn();
		const worker = createMockInstallingWorker('installing');
		const registration = createMockRegistration(worker);

		initSwUpdate();
		subscribeSwUpdate(listener);
		listener.mockClear();

		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);

		expect(listener).toHaveBeenCalledWith({
			updateAvailable: false,
			isApplying: false,
			isDownloading: true,
			downloadProgress: null,
		});
	});

	it('должен сбросить isDownloading при statechange → installed', async () => {
		const listener = vi.fn();
		const worker = createMockInstallingWorker('installing');
		const registration = createMockRegistration(worker);

		initSwUpdate();
		subscribeSwUpdate(listener);
		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);
		listener.mockClear();

		worker.dispatchStateChange('installed');

		expect(listener).toHaveBeenCalledWith({
			updateAvailable: false,
			isApplying: false,
			isDownloading: false,
			downloadProgress: null,
		});
	});

	it('должен сбросить isDownloading и выставить updateAvailable при onNeedRefresh', async () => {
		const listener = vi.fn();
		const worker = createMockInstallingWorker('installing');
		const registration = createMockRegistration(worker);

		initSwUpdate();
		subscribeSwUpdate(listener);
		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);
		listener.mockClear();

		mocks.getOptions()?.onNeedRefresh?.();

		expect(listener).toHaveBeenCalledWith({
			updateAvailable: true,
			isApplying: false,
			isDownloading: false,
			downloadProgress: null,
		});
	});

	it('должен сбросить isDownloading при statechange → redundant', async () => {
		const listener = vi.fn();
		const worker = createMockInstallingWorker('installing');
		const registration = createMockRegistration(worker);

		initSwUpdate();
		subscribeSwUpdate(listener);
		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);
		listener.mockClear();

		worker.dispatchStateChange('redundant');

		expect(listener).toHaveBeenCalledWith({
			updateAvailable: false,
			isApplying: false,
			isDownloading: false,
			downloadProgress: null,
		});
	});

	it('должен вызвать updateSW(true) при applySwUpdate', () => {
		initSwUpdate();
		applySwUpdate();

		expect(mocks.updateSWFn).toHaveBeenCalledWith(true);
	});

	it('должен вызвать updateSW только один раз при повторном applySwUpdate', () => {
		const listener = vi.fn();

		initSwUpdate();
		subscribeSwUpdate(listener);
		listener.mockClear();

		applySwUpdate();
		applySwUpdate();

		expect(mocks.updateSWFn).toHaveBeenCalledOnce();
		expect(mocks.updateSWFn).toHaveBeenCalledWith(true);
		expect(listener).toHaveBeenCalledWith({
			updateAvailable: false,
			isApplying: true,
			isDownloading: false,
			downloadProgress: null,
		});
	});

	it('должен уведомить подписчиков isApplying: true при первом applySwUpdate', () => {
		const listener = vi.fn();

		initSwUpdate();
		mocks.getOptions()?.onNeedRefresh?.();
		subscribeSwUpdate(listener);
		listener.mockClear();

		applySwUpdate();

		expect(listener).toHaveBeenCalledWith({
			updateAvailable: true,
			isApplying: true,
			isDownloading: false,
			downloadProgress: null,
		});
	});

	it('должен отписать слушателя при возврате функции unsubscribe', () => {
		const listener = vi.fn();

		initSwUpdate();
		const unsubscribe = subscribeSwUpdate(listener);
		unsubscribe();
		listener.mockClear();

		mocks.getOptions()?.onNeedRefresh?.();

		expect(listener).not.toHaveBeenCalled();
	});

	it('должен вызвать registration.update при visibilitychange (visible)', async () => {
		const registration = createMockRegistration();
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 200 }));

		initSwUpdate();
		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);

		Object.defineProperty(document, 'visibilityState', {
			configurable: true,
			get: () => 'visible',
		});
		document.dispatchEvent(new Event('visibilitychange'));

		await vi.waitFor(() => {
			expect(registration.update).toHaveBeenCalledOnce();
		});
	});

	it('должен вызвать registration.update при focus и online', async () => {
		const registration = createMockRegistration();
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 200 }));

		initSwUpdate();
		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);

		window.dispatchEvent(new Event('focus'));
		await vi.waitFor(() => {
			expect(registration.update).toHaveBeenCalledOnce();
		});

		// throttle: сразу после focus online не должен вызвать повторно
		(registration.update as ReturnType<typeof vi.fn>).mockClear();
		window.dispatchEvent(new Event('online'));
		await Promise.resolve();
		expect(registration.update).not.toHaveBeenCalled();
	});

	it('не должен вызывать update чаще throttle между проверками', async () => {
		vi.useFakeTimers();
		const registration = createMockRegistration();
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 200 }));

		initSwUpdate();
		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);

		window.dispatchEvent(new Event('focus'));
		await Promise.resolve();
		expect(registration.update).toHaveBeenCalledOnce();

		(registration.update as ReturnType<typeof vi.fn>).mockClear();
		window.dispatchEvent(new Event('focus'));
		await Promise.resolve();
		expect(registration.update).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(30_000);
		window.dispatchEvent(new Event('focus'));
		await Promise.resolve();
		expect(registration.update).toHaveBeenCalledOnce();
	});

	it('должен периодически проверять обновление SW при online', async () => {
		vi.useFakeTimers();
		const registration = createMockRegistration();
		const fetchMock = vi.fn().mockResolvedValue({ status: 200 });
		vi.stubGlobal('fetch', fetchMock);

		initSwUpdate();
		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);

		await vi.advanceTimersByTimeAsync(60 * 60 * 1000);

		expect(fetchMock).toHaveBeenCalledWith(
			'/edu.pwa-app/sw.js',
			expect.objectContaining({ cache: 'no-store' }),
		);
		expect(registration.update).toHaveBeenCalled();
	});

	it('не должен вызывать update, если navigator.onLine === false', async () => {
		vi.stubGlobal('navigator', { serviceWorker: {}, onLine: false });
		const registration = createMockRegistration();
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 200 }));

		initSwUpdate();
		await mocks.getOptions()?.onRegisteredSW?.('/edu.pwa-app/sw.js', registration);

		window.dispatchEvent(new Event('focus'));
		await Promise.resolve();

		expect(registration.update).not.toHaveBeenCalled();
	});
});
