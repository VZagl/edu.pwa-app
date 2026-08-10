import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readServiceWorkerInfo, useServiceWorkerInfo } from './useServiceWorkerInfo.ts';

function createMockRegistration(overrides: Partial<ServiceWorkerRegistration> = {}) {
	return {
		scope: 'http://localhost/',
		active: { state: 'activated', scriptURL: 'http://localhost/sw.js?v=abc123' } as ServiceWorker,
		waiting: null,
		installing: null,
		...overrides,
	} as ServiceWorkerRegistration;
}

function setupServiceWorkerMock(options: {
	controller?: ServiceWorker | null;
	registration?: ServiceWorkerRegistration | null;
	getRegistrationRejects?: boolean;
}) {
	const getRegistration = options.getRegistrationRejects
		? vi.fn().mockRejectedValue(new Error('getRegistration failed'))
		: vi.fn().mockResolvedValue(options.registration ?? null);

	const serviceWorker = {
		controller: options.controller ?? null,
		getRegistration,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
	};

	vi.stubGlobal('navigator', { serviceWorker });

	return { getRegistration, serviceWorker };
}

describe('readServiceWorkerInfo', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть supported: false, если SW не поддерживается', async () => {
		vi.stubGlobal('navigator', {});

		const info = await readServiceWorkerInfo();

		expect(info.supported).toBe(false);
		expect(info.loading).toBe(false);
		expect(info.scope).toBeNull();
	});

	it('должен прочитать scope, states и scriptURL из регистрации', async () => {
		const registration = createMockRegistration({
			scope: 'http://localhost/',
			active: { state: 'activated', scriptURL: 'http://localhost/sw.js?v=rev1' } as ServiceWorker,
			waiting: { state: 'installed' } as ServiceWorker,
			installing: { state: 'installing' } as ServiceWorker,
		});

		setupServiceWorkerMock({
			controller: { scriptURL: 'http://localhost/sw.js?v=rev1' } as ServiceWorker,
			registration,
		});

		const info = await readServiceWorkerInfo();

		expect(info.supported).toBe(true);
		expect(info.scope).toBe('http://localhost/');
		expect(info.activeState).toBe('activated');
		expect(info.waitingState).toBe('installed');
		expect(info.installingState).toBe('installing');
		expect(info.hasController).toBe(true);
		expect(info.controllerScriptUrl).toBe('http://localhost/sw.js?v=rev1');
	});
});

describe('useServiceWorkerInfo', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть unsupported при отсутствии serviceWorker в navigator', () => {
		vi.stubGlobal('navigator', {});

		const { result } = renderHook(() => useServiceWorkerInfo());

		expect(result.current.supported).toBe(false);
		expect(result.current.loading).toBe(false);
	});

	it('должен загрузить данные регистрации после mount', async () => {
		const registration = createMockRegistration();
		setupServiceWorkerMock({ registration });

		const { result, unmount } = renderHook(() => useServiceWorkerInfo());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.scope).toBe('http://localhost/');
		expect(result.current.activeState).toBe('activated');
		expect(result.current.controllerScriptUrl).toContain('sw.js');

		unmount();
	});

	it('должен обновиться при событии controllerchange', async () => {
		const registration = createMockRegistration();
		const { serviceWorker } = setupServiceWorkerMock({ registration });

		const { result, unmount } = renderHook(() => useServiceWorkerInfo());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		const updatedRegistration = createMockRegistration({
			active: { state: 'activated', scriptURL: 'http://localhost/sw.js?v=rev2' } as ServiceWorker,
		});
		serviceWorker.getRegistration.mockResolvedValue(updatedRegistration);

		const handler = serviceWorker.addEventListener.mock.calls.find(
			([event]) => event === 'controllerchange',
		)?.[1];

		await act(async () => {
			handler?.();
		});

		await waitFor(() => {
			expect(result.current.controllerScriptUrl).toBe('http://localhost/sw.js?v=rev2');
		});

		unmount();
	});

	it('должен отписаться от controllerchange при размонтировании', async () => {
		const registration = createMockRegistration();
		const { serviceWorker } = setupServiceWorkerMock({ registration });

		const { unmount } = renderHook(() => useServiceWorkerInfo());

		await waitFor(() => {
			expect(serviceWorker.addEventListener).toHaveBeenCalledWith('controllerchange', expect.any(Function));
		});

		unmount();

		expect(serviceWorker.removeEventListener).toHaveBeenCalledWith('controllerchange', expect.any(Function));
	});
});
