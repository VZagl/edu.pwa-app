import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetServiceWorkerLab } from './resetServiceWorkerLab.ts';

describe('resetServiceWorkerLab', () => {
	const reloadMock = vi.fn();

	beforeEach(() => {
		reloadMock.mockClear();
		vi.stubGlobal('location', { reload: reloadMock });
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('не должен делать ничего, если serviceWorker не поддерживается', async () => {
		vi.stubGlobal('navigator', {});

		await resetServiceWorkerLab();

		expect(reloadMock).not.toHaveBeenCalled();
	});

	it('должен unregister всех SW, очистить caches и перезагрузить страницу', async () => {
		const unregister = vi.fn().mockResolvedValue(true);
		const getRegistrations = vi.fn().mockResolvedValue([{ unregister }, { unregister }]);
		const deleteCache = vi.fn().mockResolvedValue(true);
		const keys = vi.fn().mockResolvedValue(['workbox-precache', 'runtime-json']);

		vi.stubGlobal('navigator', { serviceWorker: { getRegistrations } });
		vi.stubGlobal('caches', { keys, delete: deleteCache });

		await resetServiceWorkerLab();

		expect(getRegistrations).toHaveBeenCalledOnce();
		expect(unregister).toHaveBeenCalledTimes(2);
		expect(keys).toHaveBeenCalledOnce();
		expect(deleteCache).toHaveBeenCalledWith('workbox-precache');
		expect(deleteCache).toHaveBeenCalledWith('runtime-json');
		expect(reloadMock).toHaveBeenCalledOnce();
	});
});
