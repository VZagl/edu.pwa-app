/**
 * Учебный Service Worker: install и activate с логами в консоль.
 * Кэширование — на следующем шаге плана.
 */

self.addEventListener('install', (event) => {
	console.log('[sw.js] install', event);
});

self.addEventListener('activate', (event) => {
	console.log('[sw.js] activate', event);
});
