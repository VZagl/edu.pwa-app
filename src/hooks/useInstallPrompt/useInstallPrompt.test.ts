import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getInstallFallbackHint } from './installFallbackHints.ts';
import { useInstallPrompt } from './useInstallPrompt.ts';

const GRACE_PERIOD_MS = 1000;

interface BeforeInstallPromptEventInit extends EventInit {
	prompt?: () => Promise<void>;
	userChoice?: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

class MockBeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;

	constructor(type: string, init: BeforeInstallPromptEventInit = {}) {
		super(type, init);
		this.prompt = init.prompt ?? vi.fn().mockResolvedValue(undefined);
		this.userChoice = init.userChoice ?? Promise.resolve({ outcome: 'accepted', platform: 'web' });
	}
}

function mockStandaloneMedia(matches: boolean) {
	Object.defineProperty(window, 'matchMedia', {
		configurable: true,
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: query === '(display-mode: standalone)' ? matches : false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
}

function mockNavigatorStandalone(standalone: boolean | undefined) {
	Object.defineProperty(navigator, 'standalone', {
		configurable: true,
		value: standalone,
		writable: true,
	});
}

describe('useInstallPrompt', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		mockStandaloneMedia(false);
		mockNavigatorStandalone(undefined);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
		delete (navigator as Navigator & { standalone?: boolean }).standalone;
	});

	it('должен вернуть начальное состояние без install и fallback', () => {
		const { result } = renderHook(() => useInstallPrompt());

		expect(result.current).toEqual({
			canInstall: false,
			showFallback: false,
			fallbackHint: getInstallFallbackHint(),
			isInstalled: false,
			promptInstall: expect.any(Function),
		});
	});

	it('должен установить canInstall при beforeinstallprompt и вызвать preventDefault', () => {
		const { result } = renderHook(() => useInstallPrompt());
		const event = new MockBeforeInstallPromptEvent('beforeinstallprompt');
		const preventDefault = vi.spyOn(event, 'preventDefault');

		act(() => {
			window.dispatchEvent(event);
		});

		expect(preventDefault).toHaveBeenCalledOnce();
		expect(result.current.canInstall).toBe(true);
		expect(result.current.showFallback).toBe(false);
	});

	it('должен вызвать prompt() при promptInstall', async () => {
		const prompt = vi.fn().mockResolvedValue(undefined);
		const { result } = renderHook(() => useInstallPrompt());
		const event = new MockBeforeInstallPromptEvent('beforeinstallprompt', { prompt });

		act(() => {
			window.dispatchEvent(event);
		});

		await act(async () => {
			await result.current.promptInstall();
		});

		expect(prompt).toHaveBeenCalledOnce();
		expect(result.current.canInstall).toBe(false);
	});

	it('должен установить isInstalled после appinstalled', () => {
		const { result } = renderHook(() => useInstallPrompt());

		act(() => {
			window.dispatchEvent(new Event('appinstalled'));
		});

		expect(result.current.isInstalled).toBe(true);
		expect(result.current.canInstall).toBe(false);
		expect(result.current.showFallback).toBe(false);
	});

	it('должен определить isInstalled при display-mode: standalone', () => {
		mockStandaloneMedia(true);

		const { result } = renderHook(() => useInstallPrompt());

		expect(result.current.isInstalled).toBe(true);
		expect(result.current.showFallback).toBe(false);
	});

	it('должен определить isInstalled при navigator.standalone на iOS', () => {
		mockNavigatorStandalone(true);

		const { result } = renderHook(() => useInstallPrompt());

		expect(result.current.isInstalled).toBe(true);
	});

	it('должен показать fallback после grace period без beforeinstallprompt', () => {
		const { result } = renderHook(() => useInstallPrompt());

		act(() => {
			vi.advanceTimersByTime(GRACE_PERIOD_MS);
		});

		expect(result.current.showFallback).toBe(true);
		expect(result.current.fallbackHint).toBe(getInstallFallbackHint());
		expect(result.current.canInstall).toBe(false);
	});

	it('должен переключиться с fallback на canInstall при позднем beforeinstallprompt', () => {
		const { result } = renderHook(() => useInstallPrompt());

		act(() => {
			vi.advanceTimersByTime(GRACE_PERIOD_MS);
		});

		expect(result.current.showFallback).toBe(true);

		act(() => {
			window.dispatchEvent(new MockBeforeInstallPromptEvent('beforeinstallprompt'));
		});

		expect(result.current.canInstall).toBe(true);
		expect(result.current.showFallback).toBe(false);
	});

	it('должен отписаться от событий и очистить таймер при размонтировании', () => {
		const addSpy = vi.spyOn(window, 'addEventListener');
		const removeSpy = vi.spyOn(window, 'removeEventListener');
		const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

		const { unmount } = renderHook(() => useInstallPrompt());
		unmount();

		expect(removeSpy).toHaveBeenCalledWith('beforeinstallprompt', expect.any(Function));
		expect(removeSpy).toHaveBeenCalledWith('appinstalled', expect.any(Function));
		expect(clearTimeoutSpy).toHaveBeenCalled();

		addSpy.mockRestore();
		removeSpy.mockRestore();
		clearTimeoutSpy.mockRestore();
	});
});
