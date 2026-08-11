/* Учебные handlers Web Push для generateSW + importScripts.
 * Симуляция: DevTools → Application → Service Workers → Push.
 */

self.addEventListener('push', (event) => {
	let title = 'Учебный push';
	let body = 'Учебный push (нет payload)';

	try {
		if (event.data) {
			const text = event.data.text();
			if (text) {
				try {
					const parsed = JSON.parse(text);
					title = parsed.title || title;
					body = parsed.body || text;
				} catch {
					body = text;
				}
			}
		}
	} catch {
		// оставляем fallback-текст
	}

	event.waitUntil(
		self.registration.showNotification(title, {
			body,
			icon: '/icons/icon-192.png',
		}),
	);
});

self.addEventListener('notificationclick', (event) => {
	event.notification.close();

	event.waitUntil(
		self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
			for (const client of clientList) {
				if ('focus' in client) {
					return client.focus();
				}
			}

			if (self.clients.openWindow) {
				return self.clients.openWindow('/');
			}

			return undefined;
		}),
	);
});
