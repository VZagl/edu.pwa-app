import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readCacheNames, readCacheUrls, useCacheStorage } from './useCacheStorage.ts';

type MockCache = {
	keys: ReturnType<typeof vi.fn>;
};

function createMockCache(urls: string[]): MockCache {
	return {
		keys: vi.fn().mockResolvedValue(urls.map((url) => ({ url }) as Request)),
	};
}

function setupCachesMock(options: {
	names?: string[];
	openMap?: Record<string, MockCache>;
	keysRejects?: boolean;
	openRejects?: boolean;
}) {
	const names = options.names ?? [];
	const openMap = options.openMap ?? {};

	const caches = {
		keys: options.keysRejects
			? vi.fn().mockRejectedValue(new Error('caches.keys failed'))
			: vi.fn().mockResolvedValue(names),
		open: options.openRejects
			? vi.fn().mockRejectedValue(new Error('caches.open failed'))
			: vi.fn().mockImplementation(async (name: string) => {
					const cache = openMap[name];
					if (!cache) {
						return createMockCache([]);
					}
					return cache;
				}),
	};

	vi.stubGlobal('caches', caches);

	return caches;
}

describe('readCacheNames', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть пустой массив, если Cache Storage не поддерживается', async () => {
		vi.stubGlobal('caches', undefined);

		await expect(readCacheNames()).resolves.toEqual([]);
	});

	it('должен вернуть имена кэшей из caches.keys()', async () => {
		setupCachesMock({ names: ['precache-v1', 'runtime-json'] });

		await expect(readCacheNames()).resolves.toEqual(['precache-v1', 'runtime-json']);
	});
});

describe('readCacheUrls', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть пустой массив, если Cache Storage не поддерживается', async () => {
		vi.stubGlobal('caches', undefined);

		await expect(readCacheUrls('any')).resolves.toEqual([]);
	});

	it('должен вернуть только URL запросов из cache.keys() без тел ответов', async () => {
		const cache = createMockCache(['http://localhost/app.js', 'http://localhost/index.html']);
		setupCachesMock({
			names: ['precache-v1'],
			openMap: { 'precache-v1': cache },
		});

		const urls = await readCacheUrls('precache-v1');

		expect(urls).toEqual(['http://localhost/app.js', 'http://localhost/index.html']);
		expect(cache.keys).toHaveBeenCalledOnce();
	});
});

describe('useCacheStorage', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть supported: false при отсутствии caches', () => {
		vi.stubGlobal('caches', undefined);

		const { result } = renderHook(() => useCacheStorage());

		expect(result.current.supported).toBe(false);
		expect(result.current.loading).toBe(false);
		expect(result.current.cacheNames).toEqual([]);
		expect(result.current.selectedCache).toBeNull();
		expect(result.current.urls).toEqual([]);
		expect(result.current.error).toBeNull();
	});

	it('должен загрузить список кэшей после mount', async () => {
		setupCachesMock({ names: ['runtime-json', 'runtime-images'] });

		const { result, unmount } = renderHook(() => useCacheStorage());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.supported).toBe(true);
		expect(result.current.cacheNames).toEqual(['runtime-json', 'runtime-images']);
		expect(result.current.error).toBeNull();

		unmount();
	});

	it('должен загрузить URL при selectCache', async () => {
		const cache = createMockCache(['http://localhost/data.json']);
		setupCachesMock({
			names: ['runtime-json'],
			openMap: { 'runtime-json': cache },
		});

		const { result, unmount } = renderHook(() => useCacheStorage());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		await act(async () => {
			await result.current.selectCache('runtime-json');
		});

		await waitFor(() => {
			expect(result.current.urls).toEqual(['http://localhost/data.json']);
		});

		expect(result.current.selectedCache).toBe('runtime-json');

		unmount();
	});

	it('должен обновить список по refresh и сохранить выбранный кэш, если он ещё есть', async () => {
		const cache = createMockCache(['http://localhost/a.png']);
		const cachesMock = setupCachesMock({
			names: ['runtime-images'],
			openMap: { 'runtime-images': cache },
		});

		const { result, unmount } = renderHook(() => useCacheStorage());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		await act(async () => {
			await result.current.selectCache('runtime-images');
		});

		await waitFor(() => {
			expect(result.current.selectedCache).toBe('runtime-images');
		});

		cachesMock.keys.mockResolvedValue(['runtime-images', 'runtime-json']);
		cache.keys.mockResolvedValue([{ url: 'http://localhost/b.png' } as Request]);

		await act(async () => {
			await result.current.refresh();
		});

		await waitFor(() => {
			expect(result.current.cacheNames).toEqual(['runtime-images', 'runtime-json']);
			expect(result.current.selectedCache).toBe('runtime-images');
			expect(result.current.urls).toEqual(['http://localhost/b.png']);
		});

		unmount();
	});

	it('должен сбросить выбор, если выбранный кэш исчез после refresh', async () => {
		const cache = createMockCache(['http://localhost/a.png']);
		const cachesMock = setupCachesMock({
			names: ['runtime-images'],
			openMap: { 'runtime-images': cache },
		});

		const { result, unmount } = renderHook(() => useCacheStorage());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		await act(async () => {
			await result.current.selectCache('runtime-images');
		});

		cachesMock.keys.mockResolvedValue(['runtime-json']);

		await act(async () => {
			await result.current.refresh();
		});

		await waitFor(() => {
			expect(result.current.cacheNames).toEqual(['runtime-json']);
			expect(result.current.selectedCache).toBeNull();
			expect(result.current.urls).toEqual([]);
		});

		unmount();
	});

	it('должен записать error, если caches.keys() падает', async () => {
		setupCachesMock({ keysRejects: true });

		const { result, unmount } = renderHook(() => useCacheStorage());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toMatch(/caches\.keys failed/i);
		expect(result.current.cacheNames).toEqual([]);

		unmount();
	});
});
