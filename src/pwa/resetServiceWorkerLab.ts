/** Учебный сброс: unregister всех SW + очистка Cache Storage + reload. Только для лаборатории. */
export async function resetServiceWorkerLab(): Promise<void> {
	if (!('serviceWorker' in navigator)) {
		return;
	}

	const registrations = await navigator.serviceWorker.getRegistrations();
	await Promise.all(registrations.map((registration) => registration.unregister()));

	if ('caches' in window) {
		const keys = await caches.keys();
		await Promise.all(keys.map((key) => caches.delete(key)));
	}

	window.location.reload();
}
