import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useOnlineStatus } from './useOnlineStatus.ts';

function setNavigatorOnline(online: boolean) {
	Object.defineProperty(navigator, 'onLine', {
		configurable: true,
		value: online,
		writable: true,
	});
}

describe('useOnlineStatus', () => {
	beforeEach(() => {
		setNavigatorOnline(true);
	});

	afterEach(() => {
		setNavigatorOnline(true);
	});

	it('должен вернуть true, когда navigator.onLine === true', () => {
		const { result } = renderHook(() => useOnlineStatus());

		expect(result.current).toBe(true);
	});

	it('должен вернуть false, когда navigator.onLine === false', () => {
		setNavigatorOnline(false);

		const { result } = renderHook(() => useOnlineStatus());

		expect(result.current).toBe(false);
	});

	it('должен обновиться при событии offline', () => {
		const { result } = renderHook(() => useOnlineStatus());

		act(() => {
			setNavigatorOnline(false);
			window.dispatchEvent(new Event('offline'));
		});

		expect(result.current).toBe(false);
	});

	it('должен обновиться при событии online', () => {
		setNavigatorOnline(false);
		const { result } = renderHook(() => useOnlineStatus());

		act(() => {
			setNavigatorOnline(true);
			window.dispatchEvent(new Event('online'));
		});

		expect(result.current).toBe(true);
	});

	it('должен отписаться от событий при размонтировании', () => {
		const addSpy = vi.spyOn(window, 'addEventListener');
		const removeSpy = vi.spyOn(window, 'removeEventListener');

		const { unmount } = renderHook(() => useOnlineStatus());
		unmount();

		const onlineAdd = addSpy.mock.calls.filter(([event]) => event === 'online');
		const offlineAdd = addSpy.mock.calls.filter(([event]) => event === 'offline');
		expect(onlineAdd).toHaveLength(1);
		expect(offlineAdd).toHaveLength(1);

		expect(removeSpy).toHaveBeenCalledWith('online', expect.any(Function));
		expect(removeSpy).toHaveBeenCalledWith('offline', expect.any(Function));

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});
});
