import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	calcUsagePercent,
	formatBytes,
	readPersisted,
	readStorageEstimate,
	requestPersist,
	useStorageQuota,
} from './useStorageQuota.ts';

type StorageMockOptions = {
	estimate?: { usage?: number; quota?: number } | Error;
	persisted?: boolean | Error;
	persist?: boolean | Error;
	noEstimate?: boolean;
	noPersisted?: boolean;
	noPersist?: boolean;
};

function setupStorageMock(options: StorageMockOptions = {}) {
	const storage: Partial<StorageManager> = {};

	if (!options.noEstimate) {
		storage.estimate =
			options.estimate instanceof Error
				? vi.fn().mockRejectedValue(options.estimate)
				: vi.fn().mockResolvedValue({
						usage: options.estimate?.usage,
						quota: options.estimate?.quota,
					});
	}

	if (!options.noPersisted) {
		storage.persisted =
			options.persisted instanceof Error
				? vi.fn().mockRejectedValue(options.persisted)
				: vi.fn().mockResolvedValue(options.persisted ?? false);
	}

	if (!options.noPersist) {
		storage.persist =
			options.persist instanceof Error
				? vi.fn().mockRejectedValue(options.persist)
				: vi.fn().mockResolvedValue(options.persist ?? false);
	}

	vi.stubGlobal('navigator', { storage });

	return storage;
}

describe('formatBytes', () => {
	it('должен вернуть «—» для null', () => {
		expect(formatBytes(null)).toBe('—');
	});

	it('должен форматировать байты в читаемый вид', () => {
		expect(formatBytes(512)).toBe('512 B');
		expect(formatBytes(1024)).toBe('1.00 KB');
		expect(formatBytes(1048576)).toBe('1.00 MB');
		expect(formatBytes(1073741824)).toBe('1.00 GB');
	});
});

describe('calcUsagePercent', () => {
	it('должен вернуть null, если usage или quota отсутствуют или quota = 0', () => {
		expect(calcUsagePercent(null, 100)).toBeNull();
		expect(calcUsagePercent(50, null)).toBeNull();
		expect(calcUsagePercent(50, 0)).toBeNull();
	});

	it('должен посчитать процент заполнения', () => {
		expect(calcUsagePercent(25, 100)).toBe(25);
		expect(calcUsagePercent(1, 3)).toBeCloseTo(33.33, 1);
	});
});

describe('readStorageEstimate', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть null-значения, если Storage API не поддерживается', async () => {
		vi.stubGlobal('navigator', {});

		await expect(readStorageEstimate()).resolves.toEqual({ usage: null, quota: null });
	});

	it('должен вернуть usage и quota из estimate()', async () => {
		setupStorageMock({ estimate: { usage: 1024, quota: 4096 } });

		await expect(readStorageEstimate()).resolves.toEqual({ usage: 1024, quota: 4096 });
	});

	it('должен нормализовать отсутствующие usage/quota в null', async () => {
		setupStorageMock({ estimate: {} });

		await expect(readStorageEstimate()).resolves.toEqual({ usage: null, quota: null });
	});
});

describe('readPersisted', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть null, если persisted недоступен', async () => {
		setupStorageMock({ noPersisted: true });

		await expect(readPersisted()).resolves.toBeNull();
	});

	it('должен вернуть результат persisted()', async () => {
		setupStorageMock({ persisted: true });

		await expect(readPersisted()).resolves.toBe(true);
	});
});

describe('requestPersist', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть null, если persist недоступен', async () => {
		setupStorageMock({ noPersist: true });

		await expect(requestPersist()).resolves.toBeNull();
	});

	it('должен вернуть результат persist()', async () => {
		setupStorageMock({ persist: true });

		await expect(requestPersist()).resolves.toBe(true);
	});
});

describe('useStorageQuota', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть supported: false при отсутствии navigator.storage', () => {
		vi.stubGlobal('navigator', {});

		const { result } = renderHook(() => useStorageQuota());

		expect(result.current.supported).toBe(false);
		expect(result.current.loading).toBe(false);
		expect(result.current.usage).toBeNull();
		expect(result.current.quota).toBeNull();
		expect(result.current.persisted).toBeNull();
		expect(result.current.error).toBeNull();
	});

	it('должен загрузить estimate и persisted после mount', async () => {
		setupStorageMock({ estimate: { usage: 2048, quota: 8192 }, persisted: false });

		const { result, unmount } = renderHook(() => useStorageQuota());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.supported).toBe(true);
		expect(result.current.usage).toBe(2048);
		expect(result.current.quota).toBe(8192);
		expect(result.current.persisted).toBe(false);
		expect(result.current.error).toBeNull();

		unmount();
	});

	it('должен обновить значения по refresh', async () => {
		const storage = setupStorageMock({
			estimate: { usage: 100, quota: 1000 },
			persisted: false,
		});

		const { result, unmount } = renderHook(() => useStorageQuota());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		(storage.estimate as ReturnType<typeof vi.fn>).mockResolvedValue({ usage: 200, quota: 1000 });
		(storage.persisted as ReturnType<typeof vi.fn>).mockResolvedValue(true);

		await act(async () => {
			await result.current.refresh();
		});

		await waitFor(() => {
			expect(result.current.usage).toBe(200);
			expect(result.current.persisted).toBe(true);
		});

		unmount();
	});

	it('должен вызвать persist и обновить persisted через requestPersist', async () => {
		const storage = setupStorageMock({
			estimate: { usage: 10, quota: 100 },
			persisted: false,
			persist: true,
		});

		const { result, unmount } = renderHook(() => useStorageQuota());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		let granted: boolean | null = null;

		await act(async () => {
			granted = await result.current.requestPersist();
		});

		expect(granted).toBe(true);
		expect(storage.persist).toHaveBeenCalledOnce();

		await waitFor(() => {
			expect(result.current.persisted).toBe(true);
		});

		unmount();
	});

	it('должен записать error, если estimate() падает', async () => {
		setupStorageMock({ estimate: new Error('estimate failed') });

		const { result, unmount } = renderHook(() => useStorageQuota());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toMatch(/estimate failed/i);
		expect(result.current.usage).toBeNull();
		expect(result.current.quota).toBeNull();

		unmount();
	});
});
