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

describe('swUpdateController', () => {
	beforeEach(() => {
		resetSwUpdateControllerForTests();
		mocks.registerSW.mockClear();
		mocks.updateSWFn.mockClear();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('должен зарегистрировать SW через virtual:pwa-register при поддержке браузером', () => {
		vi.stubGlobal('navigator', { serviceWorker: {} });

		initSwUpdate();

		expect(mocks.registerSW).toHaveBeenCalledOnce();
		expect(mocks.getOptions()?.immediate).toBe(true);
		expect(mocks.getOptions()?.onNeedRefresh).toBeTypeOf('function');
	});

	it('не должен вызывать registerSW, если Service Worker не поддерживается', () => {
		vi.stubGlobal('navigator', {});

		initSwUpdate();

		expect(mocks.registerSW).not.toHaveBeenCalled();
	});

	it('должен уведомить подписчиков при onNeedRefresh', () => {
		vi.stubGlobal('navigator', { serviceWorker: {} });
		const listener = vi.fn();

		initSwUpdate();
		subscribeSwUpdate(listener);
		listener.mockClear();

		mocks.getOptions()?.onNeedRefresh?.();

		expect(listener).toHaveBeenCalledWith({ updateAvailable: true });
	});

	it('должен сразу сообщить текущее состояние новому подписчику', () => {
		vi.stubGlobal('navigator', { serviceWorker: {} });
		const listener = vi.fn();

		initSwUpdate();
		mocks.getOptions()?.onNeedRefresh?.();

		subscribeSwUpdate(listener);

		expect(listener).toHaveBeenCalledWith({ updateAvailable: true });
	});

	it('должен вызвать updateSW(true) при applySwUpdate', () => {
		vi.stubGlobal('navigator', { serviceWorker: {} });

		initSwUpdate();
		applySwUpdate();

		expect(mocks.updateSWFn).toHaveBeenCalledWith(true);
	});

	it('должен отписать слушателя при возврате функции unsubscribe', () => {
		vi.stubGlobal('navigator', { serviceWorker: {} });
		const listener = vi.fn();

		initSwUpdate();
		const unsubscribe = subscribeSwUpdate(listener);
		unsubscribe();
		listener.mockClear();

		mocks.getOptions()?.onNeedRefresh?.();

		expect(listener).not.toHaveBeenCalled();
	});
});
