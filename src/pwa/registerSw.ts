/**
 * Регистрирует учебный Service Worker из public/sw.js.
 * Вызывается при старте приложения; при отсутствии поддержки SW — no-op.
 */
export async function registerSw(): Promise<void> {
	if (!('serviceWorker' in navigator)) {
		return;
	}

	try {
		await navigator.serviceWorker.register('/sw.js');
	} catch (error) {
		console.error('Не удалось зарегистрировать Service Worker:', error);
	}
}
