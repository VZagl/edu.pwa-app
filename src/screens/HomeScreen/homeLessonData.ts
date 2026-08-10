/** Вводный текст экрана «Главная» — что такое учебное PWA. */
export const homeIntro = [
	'Это учебное PWA: живая лаборатория, где каждый раздел показывает одну возможность Progressive Web App на реальном коде.',
	'Пройдите модули по порядку: манифест → Service Worker → офлайн и кэш → установка. Новые разделы появятся в списке ниже автоматически.',
] as const;

/** Краткий чеклист критериев PWA (полный — в docs/project/pwa-checklist.md). */
export const pwaChecklistItems = [
	'Web App Manifest валиден: name, short_name, start_url, display, иконки 192 и 512',
	'Service Worker зарегистрирован и отвечает на запросы',
	'Офлайн: при отсутствии сети загружается закэшированный контент или fallback',
	'Приложение installable (критерии браузера / Lighthouse)',
	'HTTPS в production (на localhost — исключение для разработки)',
] as const;

/** Подсказки, как пользоваться лабораторией. */
export const howToItems = [
	'Для проверки PWA соберите production-сборку командой pnpm build, затем откройте pnpm preview.',
	'В Chrome DevTools → Application смотрите Manifest, Service Workers и Cache Storage.',
	'Во вкладке Network включите Offline, чтобы проверить офлайн-сценарий.',
] as const;

/** Почему для PWA нужен HTTPS. */
export const httpsWhyItems = [
	'PWA API (Service Worker, install и др.) доступны только в secure context — обычно это HTTPS.',
	'Исключение для разработки: localhost считается безопасным контекстом без HTTPS.',
	'На GitHub Pages HTTPS включён из коробки — удобный хостинг для учебного деплоя.',
] as const;
