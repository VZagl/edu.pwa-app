import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePushNotifications } from './usePushNotifications.ts';
import { urlBase64ToUint8Array, VAPID_PUBLIC_KEY } from './vapidPublicKey.ts';

type MockPushSubscription = {
	endpoint: string;
	unsubscribe: ReturnType<typeof vi.fn>;
};

function createMockSubscription(endpoint = 'https://push.example/endpoint-abc'): MockPushSubscription {
	return {
		endpoint,
		unsubscribe: vi.fn().mockResolvedValue(true),
	};
}

function setupPushEnvironment(options: {
	notification?: boolean;
	permission?: NotificationPermission;
	serviceWorker?: boolean;
	pushManager?: boolean;
	existingSubscription?: MockPushSubscription | null;
	subscribeRejects?: boolean;
	showNotificationRejects?: boolean;
}) {
	const permission = options.permission ?? 'default';
	const existingSubscription = options.existingSubscription ?? null;

	const pushManager = {
		getSubscription: vi.fn().mockResolvedValue(existingSubscription),
		subscribe: options.subscribeRejects
			? vi.fn().mockRejectedValue(new Error('subscribe failed'))
			: vi.fn().mockImplementation(async () => createMockSubscription()),
	};

	const registration = {
		pushManager: options.pushManager === false ? undefined : pushManager,
		showNotification: options.showNotificationRejects
			? vi.fn().mockRejectedValue(new Error('showNotification failed'))
			: vi.fn().mockResolvedValue(undefined),
	};

	const requestPermission = vi.fn().mockResolvedValue(permission === 'default' ? 'granted' : permission);

	if (options.notification === false) {
		vi.stubGlobal('Notification', undefined);
	} else {
		vi.stubGlobal('Notification', {
			permission,
			requestPermission,
		});
	}

	if (options.serviceWorker === false) {
		Object.defineProperty(navigator, 'serviceWorker', {
			configurable: true,
			value: undefined,
		});
	} else {
		Object.defineProperty(navigator, 'serviceWorker', {
			configurable: true,
			value: {
				ready: Promise.resolve(registration),
			},
		});
	}

	return { pushManager, registration, requestPermission };
}

describe('urlBase64ToUint8Array', () => {
	it('должен декодировать VAPID public key в Uint8Array ненулевой длины', () => {
		const bytes = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);

		expect(bytes).toBeInstanceOf(Uint8Array);
		expect(bytes.length).toBeGreaterThan(0);
		expect(bytes[0]).toBe(0x04);
	});
});

describe('usePushNotifications', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('должен вернуть supported: false без Notification API', async () => {
		setupPushEnvironment({ notification: false });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.supported).toBe(false);
		});

		expect(result.current.permission).toBe('default');
		expect(result.current.subscription).toBeNull();
		expect(result.current.error).toBeNull();
	});

	it('должен вернуть supported: false без serviceWorker', async () => {
		setupPushEnvironment({ serviceWorker: false });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.supported).toBe(false);
		});
	});

	it('должен прочитать permission и отсутствие подписки при поддержке', async () => {
		setupPushEnvironment({ permission: 'granted' });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.supported).toBe(true);
			expect(result.current.permission).toBe('granted');
		});

		expect(result.current.subscription).toBeNull();
	});

	it('должен отразить существующую подписку после mount', async () => {
		const existing = createMockSubscription('https://push.example/existing');
		setupPushEnvironment({ permission: 'granted', existingSubscription: existing });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.subscription).toEqual({ endpoint: 'https://push.example/existing' });
		});
	});

	it('должен запросить разрешение через requestPermission', async () => {
		const { requestPermission } = setupPushEnvironment({ permission: 'default' });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.supported).toBe(true);
		});

		await act(async () => {
			await result.current.requestPermission();
		});

		expect(requestPermission).toHaveBeenCalledOnce();
		expect(result.current.permission).toBe('granted');
	});

	it('должен подписаться через PushManager.subscribe с VAPID ключом', async () => {
		const { pushManager } = setupPushEnvironment({ permission: 'granted' });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.supported).toBe(true);
		});

		await act(async () => {
			await result.current.subscribe();
		});

		await waitFor(() => {
			expect(result.current.subscription).not.toBeNull();
		});

		expect(pushManager.subscribe).toHaveBeenCalledWith(
			expect.objectContaining({
				userVisibleOnly: true,
				applicationServerKey: expect.any(Uint8Array),
			}),
		);
		expect(result.current.subscription?.endpoint).toMatch(/push\.example/);
	});

	it('должен отписаться через unsubscribe', async () => {
		const existing = createMockSubscription();
		setupPushEnvironment({ permission: 'granted', existingSubscription: existing });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.subscription).not.toBeNull();
		});

		await act(async () => {
			await result.current.unsubscribe();
		});

		await waitFor(() => {
			expect(result.current.subscription).toBeNull();
		});

		expect(existing.unsubscribe).toHaveBeenCalledOnce();
	});

	it('должен показать локальное уведомление при granted', async () => {
		const { registration } = setupPushEnvironment({ permission: 'granted' });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.supported).toBe(true);
		});

		await act(async () => {
			await result.current.showLocalNotification();
		});

		expect(registration.showNotification).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				body: expect.any(String),
			}),
		);
		expect(result.current.error).toBeNull();
	});

	it('должен записать error, если subscribe падает', async () => {
		setupPushEnvironment({ permission: 'granted', subscribeRejects: true });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.supported).toBe(true);
		});

		await act(async () => {
			await result.current.subscribe();
		});

		await waitFor(() => {
			expect(result.current.error).toMatch(/subscribe failed/i);
		});
	});

	it('должен записать error при showLocalNotification без granted', async () => {
		setupPushEnvironment({ permission: 'denied' });

		const { result } = renderHook(() => usePushNotifications());

		await waitFor(() => {
			expect(result.current.permission).toBe('denied');
		});

		await act(async () => {
			await result.current.showLocalNotification();
		});

		expect(result.current.error).toMatch(/разрешен/i);
	});
});
