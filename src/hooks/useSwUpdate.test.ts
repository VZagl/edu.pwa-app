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

describe('useSwUpdate', () => {
	beforeEach(() => {
		controllerMocks.subscribeSwUpdate.mockImplementation(
			(listener: (state: { updateAvailable: boolean }) => void) => {
				listener({ updateAvailable: false });
				return vi.fn();
			},
		);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('должен вернуть updateAvailable: false по умолчанию', () => {
		const { result } = renderHook(() => useSwUpdate());

		expect(result.current.updateAvailable).toBe(false);
	});

	it('должен обновить updateAvailable при уведомлении от controller', () => {
		let notify: ((state: { updateAvailable: boolean }) => void) | undefined;
		controllerMocks.subscribeSwUpdate.mockImplementation((listener) => {
			notify = listener;
			listener({ updateAvailable: false });
			return vi.fn();
		});

		const { result } = renderHook(() => useSwUpdate());

		act(() => {
			notify?.({ updateAvailable: true });
		});

		expect(result.current.updateAvailable).toBe(true);
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
