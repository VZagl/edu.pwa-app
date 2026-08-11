import { useCallback, useEffect, useState } from 'react';

export type StorageEstimateResult = {
	usage: number | null;
	quota: number | null;
};

export type StorageQuotaState = {
	supported: boolean;
	loading: boolean;
	error: string | null;
	usage: number | null;
	quota: number | null;
	persisted: boolean | null;
};

export type UseStorageQuotaResult = StorageQuotaState & {
	refresh: () => Promise<void>;
	requestPersist: () => Promise<boolean | null>;
};

const unsupportedState: StorageQuotaState = {
	supported: false,
	loading: false,
	error: null,
	usage: null,
	quota: null,
	persisted: null,
};

function isStorageSupported(): boolean {
	return (
		typeof navigator !== 'undefined' &&
		typeof navigator.storage !== 'undefined' &&
		typeof navigator.storage.estimate === 'function'
	);
}

function toErrorMessage(err: unknown): string {
	return err instanceof Error ? err.message : String(err);
}

/** Форматирует байты в человекочитаемый вид (B / KB / MB / GB). */
export function formatBytes(bytes: number | null): string {
	if (bytes === null) {
		return '—';
	}

	if (bytes < 1024) {
		return `${bytes} B`;
	}

	const units = ['KB', 'MB', 'GB'] as const;
	let value = bytes / 1024;
	let unitIndex = 0;

	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex += 1;
	}

	return `${value.toFixed(2)} ${units[unitIndex]}`;
}

/** Доля заполнения квоты в процентах; null, если данных недостаточно. */
export function calcUsagePercent(usage: number | null, quota: number | null): number | null {
	if (usage === null || quota === null || quota === 0) {
		return null;
	}

	return (usage / quota) * 100;
}

/** Читает приблизительные usage/quota через StorageManager.estimate(). */
export async function readStorageEstimate(): Promise<StorageEstimateResult> {
	if (!isStorageSupported()) {
		return { usage: null, quota: null };
	}

	const estimate = await navigator.storage.estimate();

	return {
		usage: typeof estimate.usage === 'number' ? estimate.usage : null,
		quota: typeof estimate.quota === 'number' ? estimate.quota : null,
	};
}

/** Проверяет, помечено ли хранилище как persistent. */
export async function readPersisted(): Promise<boolean | null> {
	if (!isStorageSupported() || typeof navigator.storage.persisted !== 'function') {
		return null;
	}

	return navigator.storage.persisted();
}

/** Запрашивает Persistent Storage; браузер может отказать. */
export async function requestPersist(): Promise<boolean | null> {
	if (!isStorageSupported() || typeof navigator.storage.persist !== 'function') {
		return null;
	}

	return navigator.storage.persist();
}

export function useStorageQuota(): UseStorageQuotaResult {
	const supported = isStorageSupported();
	const [state, setState] = useState<StorageQuotaState>(() =>
		supported ? { ...unsupportedState, supported: true, loading: true } : unsupportedState,
	);

	const refresh = useCallback(async () => {
		if (!isStorageSupported()) {
			setState(unsupportedState);
			return;
		}

		setState((prev) => ({ ...prev, supported: true, loading: true, error: null }));

		try {
			const [{ usage, quota }, persisted] = await Promise.all([readStorageEstimate(), readPersisted()]);

			setState({
				supported: true,
				loading: false,
				error: null,
				usage,
				quota,
				persisted,
			});
		} catch (err) {
			setState({
				supported: true,
				loading: false,
				error: toErrorMessage(err),
				usage: null,
				quota: null,
				persisted: null,
			});
		}
	}, []);

	const requestPersistAction = useCallback(async () => {
		if (!isStorageSupported()) {
			return null;
		}

		try {
			const granted = await requestPersist();

			if (granted !== null) {
				setState((prev) => ({ ...prev, persisted: granted, error: null }));
			}

			return granted;
		} catch (err) {
			setState((prev) => ({ ...prev, error: toErrorMessage(err) }));
			return null;
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
		requestPersist: requestPersistAction,
	};
}
