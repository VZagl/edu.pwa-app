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

type SwUpdateState = { updateAvailable: boolean; isApplying: boolean };

describe('useSwUpdate', () => {
	beforeEach(() => {
		controllerMocks.subscribeSwUpdate.mockImplementation((listener: (state: SwUpdateState) => void) => {
			listener({ updateAvailable: false, isApplying: false });
			return vi.fn();
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('должен вернуть updateAvailable: false и isApplying: false по умолчанию', () => {
		const { result } = renderHook(() => useSwUpdate());

		expect(result.current.updateAvailable).toBe(false);
		expect(result.current.isApplying).toBe(false);
	});

	it('должен обновить updateAvailable при уведомлении от controller', () => {
		let notify: ((state: SwUpdateState) => void) | undefined;
		controllerMocks.subscribeSwUpdate.mockImplementation((listener) => {
			notify = listener;
			listener({ updateAvailable: false, isApplying: false });
			return vi.fn();
		});

		const { result } = renderHook(() => useSwUpdate());

		act(() => {
			notify?.({ updateAvailable: true, isApplying: false });
		});

		expect(result.current.updateAvailable).toBe(true);
		expect(result.current.isApplying).toBe(false);
	});

	it('должен обновить isApplying при уведомлении от controller', () => {
		let notify: ((state: SwUpdateState) => void) | undefined;
		controllerMocks.subscribeSwUpdate.mockImplementation((listener) => {
			notify = listener;
			listener({ updateAvailable: true, isApplying: false });
			return vi.fn();
		});

		const { result } = renderHook(() => useSwUpdate());

		act(() => {
			notify?.({ updateAvailable: true, isApplying: true });
		});

		expect(result.current.isApplying).toBe(true);
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
