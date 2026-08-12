import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const controllerMocks = vi.hoisted(() => ({
	subscribeSwUpdate: vi.fn(),
	applySwUpdate: vi.fn(),
}));

vi.mock('../pwa/swUpdateController.ts', () => ({
	subscribeSwUpdate: controllerMocks.subscribeSwUpdate,
	applySwUpdate: controllerMocks.applySwUpdate,
}));

import { useSwUpdate } from './useSwUpdate.ts';

type SwUpdateState = {
	updateAvailable: boolean;
	isApplying: boolean;
	isDownloading: boolean;
	downloadProgress: number | null;
};

const idleState: SwUpdateState = {
	updateAvailable: false,
	isApplying: false,
	isDownloading: false,
	downloadProgress: null,
};

describe('useSwUpdate', () => {
	beforeEach(() => {
		controllerMocks.subscribeSwUpdate.mockImplementation((listener: (state: SwUpdateState) => void) => {
			listener(idleState);
			return vi.fn();
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('должен вернуть idle-состояние по умолчанию', () => {
		const { result } = renderHook(() => useSwUpdate());

		expect(result.current.updateAvailable).toBe(false);
		expect(result.current.isApplying).toBe(false);
		expect(result.current.isDownloading).toBe(false);
		expect(result.current.downloadProgress).toBeNull();
	});

	it('должен обновить updateAvailable при уведомлении от controller', () => {
		let notify: ((state: SwUpdateState) => void) | undefined;
		controllerMocks.subscribeSwUpdate.mockImplementation((listener) => {
			notify = listener;
			listener(idleState);
			return vi.fn();
		});

		const { result } = renderHook(() => useSwUpdate());

		act(() => {
			notify?.({ updateAvailable: true, isApplying: false, isDownloading: false, downloadProgress: null });
		});

		expect(result.current.updateAvailable).toBe(true);
		expect(result.current.isApplying).toBe(false);
	});

	it('должен обновить isApplying при уведомлении от controller', () => {
		let notify: ((state: SwUpdateState) => void) | undefined;
		controllerMocks.subscribeSwUpdate.mockImplementation((listener) => {
			notify = listener;
			listener({ updateAvailable: true, isApplying: false, isDownloading: false, downloadProgress: null });
			return vi.fn();
		});

		const { result } = renderHook(() => useSwUpdate());

		act(() => {
			notify?.({ updateAvailable: true, isApplying: true, isDownloading: false, downloadProgress: null });
		});

		expect(result.current.isApplying).toBe(true);
	});

	it('должен обновить isDownloading и downloadProgress при уведомлении от controller', () => {
		let notify: ((state: SwUpdateState) => void) | undefined;
		controllerMocks.subscribeSwUpdate.mockImplementation((listener) => {
			notify = listener;
			listener(idleState);
			return vi.fn();
		});

		const { result } = renderHook(() => useSwUpdate());

		act(() => {
			notify?.({
				updateAvailable: false,
				isApplying: false,
				isDownloading: true,
				downloadProgress: null,
			});
		});

		expect(result.current.isDownloading).toBe(true);
		expect(result.current.downloadProgress).toBeNull();
	});

	it('должен вызвать applySwUpdate при applyUpdate', () => {
		const { result } = renderHook(() => useSwUpdate());

		act(() => {
			result.current.applyUpdate();
		});

		expect(controllerMocks.applySwUpdate).toHaveBeenCalledOnce();
	});

	it('должен отписаться от controller при размонтировании', () => {
		const unsubscribe = vi.fn();
		controllerMocks.subscribeSwUpdate.mockReturnValue(unsubscribe);

		const { unmount } = renderHook(() => useSwUpdate());
		unmount();

		expect(unsubscribe).toHaveBeenCalledOnce();
	});
});
