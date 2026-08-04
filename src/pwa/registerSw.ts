/**
 * Регистрирует Service Worker, сгенерированный vite-plugin-pwa (Workbox precache).
 * Вызывается при старте приложения; при отсутствии поддержки SW — no-op.
 * В dev SW отключён — регистрация срабатывает после production-сборки (preview/deploy).
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
