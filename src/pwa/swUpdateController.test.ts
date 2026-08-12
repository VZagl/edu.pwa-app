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

function createMockRegistration(): ServiceWorkerRegistration {
	return {
		installing: null,
		update: vi.fn().mockResolvedValue(undefined),
	} as unknown as ServiceWorkerRegistration;
}

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

		expect(listener).toHaveBeenCalledWith({ updateAvailable: true, isApplying: false });
	});

	it('должен сразу сообщить текущее состояние новому подписчику', () => {
		const listener = vi.fn();

		initSwUpdate();
		mocks.getOptions()?.onNeedRefresh?.();

		subscribeSwUpdate(listener);

		expect(listener).toHaveBeenCalledWith({ updateAvailable: true, isApplying: false });
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
		expect(listener).toHaveBeenCalledWith({ updateAvailable: false, isApplying: true });
	});

	it('должен уведомить подписчиков isApplying: true при первом applySwUpdate', () => {
		const listener = vi.fn();

		initSwUpdate();
		mocks.getOptions()?.onNeedRefresh?.();
		subscribeSwUpdate(listener);
		listener.mockClear();

		applySwUpdate();

		expect(listener).toHaveBeenCalledWith({ updateAvailable: true, isApplying: true });
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
