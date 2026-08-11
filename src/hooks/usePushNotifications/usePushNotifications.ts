import { useCallback, useEffect, useState } from 'react';
import { urlBase64ToUint8Array, VAPID_PUBLIC_KEY } from './vapidPublicKey.ts';

export type PushSubscriptionSnapshot = {
	endpoint: string;
} | null;

export type UsePushNotificationsResult = {
	supported: boolean;
	permission: NotificationPermission;
	subscription: PushSubscriptionSnapshot;
	error: string | null;
	message: string | null;
	requestPermission: () => Promise<void>;
	subscribe: () => Promise<void>;
	unsubscribe: () => Promise<void>;
	showLocalNotification: () => Promise<void>;
};

function isPushSupported(): boolean {
	return (
		typeof window !== 'undefined' &&
		typeof Notification !== 'undefined' &&
		'serviceWorker' in navigator &&
		typeof navigator.serviceWorker !== 'undefined'
	);
}

function toErrorMessage(err: unknown): string {
	return err instanceof Error ? err.message : String(err);
}

function toSnapshot(subscription: PushSubscription | null): PushSubscriptionSnapshot {
	if (!subscription) {
		return null;
	}

	return { endpoint: subscription.endpoint };
}

async function getRegistration(): Promise<ServiceWorkerRegistration> {
	return navigator.serviceWorker.ready;
}

export function usePushNotifications(): UsePushNotificationsResult {
	const supported = isPushSupported();
	const [permission, setPermission] = useState<NotificationPermission>(() =>
		supported ? Notification.permission : 'default',
	);
	const [subscription, setSubscription] = useState<PushSubscriptionSnapshot>(null);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		if (!supported) {
			return;
		}

		let cancelled = false;

		void (async () => {
			try {
				setPermission(Notification.permission);
				const registration = await getRegistration();
				const current = registration.pushManager ? await registration.pushManager.getSubscription() : null;

				if (!cancelled) {
					setSubscription(toSnapshot(current));
					setError(null);
				}
			} catch (err) {
				if (!cancelled) {
					setError(toErrorMessage(err));
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [supported]);

	const requestPermission = useCallback(async () => {
		if (!supported) {
			setError('Notification API недоступен в этом окружении.');
			return;
		}

		setError(null);
		setMessage(null);

		try {
			const result = await Notification.requestPermission();
			setPermission(result);
			if (result === 'granted') {
				setMessage('Разрешение на уведомления получено.');
			} else if (result === 'denied') {
				setMessage('Разрешение отклонено. Изменить можно только в настройках браузера.');
			}
		} catch (err) {
			setError(toErrorMessage(err));
		}
	}, [supported]);

	const subscribe = useCallback(async () => {
		if (!supported) {
			setError('Push API недоступен в этом окружении.');
			return;
		}

		if (Notification.permission !== 'granted') {
			setError('Сначала нужно разрешение на уведомления (granted).');
			return;
		}

		setError(null);
		setMessage(null);

		try {
			const registration = await getRegistration();
			if (!registration.pushManager) {
				setError('PushManager недоступен (нет поддержки Web Push).');
				return;
			}

			const next = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
			});

			setSubscription(toSnapshot(next));
			setPermission(Notification.permission);
			setMessage(
				'Подписка создана локально. Endpoint нужно сохранить на backend — в этом уроке сервера нет.',
			);
		} catch (err) {
			setError(toErrorMessage(err));
		}
	}, [supported]);

	const unsubscribe = useCallback(async () => {
		if (!supported) {
			return;
		}

		setError(null);
		setMessage(null);

		try {
			const registration = await getRegistration();
			const current = registration.pushManager ? await registration.pushManager.getSubscription() : null;

			if (!current) {
				setSubscription(null);
				setMessage('Активной подписки нет.');
				return;
			}

			await current.unsubscribe();
			setSubscription(null);
			setMessage('Подписка отменена.');
		} catch (err) {
			setError(toErrorMessage(err));
		}
	}, [supported]);

	const showLocalNotification = useCallback(async () => {
		if (!supported) {
			setError('Notification API недоступен в этом окружении.');
			return;
		}

		if (Notification.permission !== 'granted') {
			setError('Локальное уведомление требует разрешения (granted).');
			return;
		}

		setError(null);
		setMessage(null);

		try {
			const registration = await getRegistration();
			await registration.showNotification('Учебное уведомление', {
				body: 'Локальный вызов showNotification — это не Web Push с сервера.',
				icon: `${import.meta.env.BASE_URL}icons/icon-192.png`,
			});
			setMessage('Локальное уведомление показано через Service Worker.');
		} catch (err) {
			setError(toErrorMessage(err));
		}
	}, [supported]);

	return {
		supported,
		permission,
		subscription,
		error,
		message,
		requestPermission,
		subscribe,
		unsubscribe,
		showLocalNotification,
	};
}
