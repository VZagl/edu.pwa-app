import { useCallback, useEffect, useRef, useState } from 'react';

export type CacheStorageState = {
	supported: boolean;
	loading: boolean;
	error: string | null;
	cacheNames: string[];
	selectedCache: string | null;
	urls: string[];
};

export type UseCacheStorageResult = CacheStorageState & {
	refresh: () => Promise<void>;
	selectCache: (name: string) => Promise<void>;
};

function isCachesSupported(): boolean {
	return typeof caches !== 'undefined' && typeof caches.keys === 'function';
}

/** Читает имена кэшей через Cache Storage API. Без тел ответов. */
export async function readCacheNames(): Promise<string[]> {
	if (!isCachesSupported()) {
		return [];
	}

	return caches.keys();
}

/** Читает URL запросов в кэше; тела ответов не трогаем. */
export async function readCacheUrls(cacheName: string): Promise<string[]> {
	if (!isCachesSupported()) {
		return [];
	}

	const cache = await caches.open(cacheName);
	const requests = await cache.keys();

	return requests.map((request) => request.url);
}

const unsupportedState: CacheStorageState = {
	supported: false,
	loading: false,
	error: null,
	cacheNames: [],
	selectedCache: null,
	urls: [],
};

function toErrorMessage(err: unknown): string {
	return err instanceof Error ? err.message : String(err);
}

export function useCacheStorage(): UseCacheStorageResult {
	const supported = isCachesSupported();
	const [state, setState] = useState<CacheStorageState>(() =>
		supported ? { ...unsupportedState, supported: true, loading: true } : unsupportedState,
	);
	const selectedCacheRef = useRef<string | null>(null);

	selectedCacheRef.current = state.selectedCache;

	const refresh = useCallback(async () => {
		if (!isCachesSupported()) {
			setState(unsupportedState);
			return;
		}

		setState((prev) => ({ ...prev, supported: true, loading: true, error: null }));

		try {
			const cacheNames = await readCacheNames();
			const previousSelected = selectedCacheRef.current;
			const keepSelection = previousSelected !== null && cacheNames.includes(previousSelected);
			const selectedCache = keepSelection ? previousSelected : null;

			if (selectedCache === null) {
				setState({
					supported: true,
					loading: false,
					error: null,
					cacheNames,
					selectedCache: null,
					urls: [],
				});
				return;
			}

			const urls = await readCacheUrls(selectedCache);
			setState({
				supported: true,
				loading: false,
				error: null,
				cacheNames,
				selectedCache,
				urls,
			});
		} catch (err) {
			setState({
				supported: true,
				loading: false,
				error: toErrorMessage(err),
				cacheNames: [],
				selectedCache: null,
				urls: [],
			});
		}
	}, []);

	const selectCache = useCallback(async (name: string) => {
		if (!isCachesSupported()) {
			return;
		}

		selectedCacheRef.current = name;
		setState((prev) => ({
			...prev,
			selectedCache: name,
			loading: true,
			error: null,
			urls: [],
		}));

		try {
			const urls = await readCacheUrls(name);
			setState((prev) => ({
				...prev,
				selectedCache: name,
				loading: false,
				urls,
				error: null,
			}));
		} catch (err) {
			setState((prev) => ({
				...prev,
				selectedCache: name,
				loading: false,
				urls: [],
				error: toErrorMessage(err),
			}));
		}
	}, []);

	useEffect(() => {
		if (!supported) {
			return;
		}

		void refresh();
	}, [supported, refresh]);

	return {
		...state,
		refresh,
		selectCache,
	};
}
