/** Вводный текст экрана «Cache Storage». */
export const cacheStorageIntro = [
	'Cache Storage — браузерное хранилище HTTP-ответов, которым управляет Service Worker (и код страницы через window.caches).',
	'В этом разделе можно увидеть реальные имена кэшей Workbox/runtime и URL записей внутри выбранного кэша. Тела ответов не читаем — только ключи (Request URL).',
] as const;

export type ApiMethodItem = {
	id: string;
	label: string;
	description: string;
};

/** Ключевые методы Cache Storage API для урока. */
export const apiMethods: ApiMethodItem[] = [
	{
		id: 'caches-keys',
		label: 'caches.keys()',
		description: 'Возвращает имена всех кэшей в origin. В демо ниже — список слева/сверху.',
	},
	{
		id: 'caches-open',
		label: 'caches.open(name)',
		description: 'Открывает (или создаёт) Cache с заданным именем. Нужен, чтобы прочитать записи.',
	},
	{
		id: 'cache-keys',
		label: 'cache.keys()',
		description:
			'Список Request в кэше. Мы берём только request.url — без cache.match() и без тел ответов.',
	},
];

export type WorkboxCacheHint = {
	id: string;
	name: string;
	description: string;
};

/** Связь с Offline/Workbox: какие имена кэшей обычно появляются. */
export const workboxCacheHints: WorkboxCacheHint[] = [
	{
		id: 'precache',
		name: 'precache (Workbox)',
		description:
			'Имя вида workbox-precache-v2-… — статика сборки (JS, CSS, HTML, иконки), положенная при установке SW.',
	},
	{
		id: 'runtime-json',
		name: 'runtime-json',
		description: 'Runtime-кэш JSON (NetworkFirst) из vite.config / раздела Offline.',
	},
	{
		id: 'runtime-images',
		name: 'runtime-images',
		description: 'Runtime-кэш изображений (StaleWhileRevalidate) из раздела Offline.',
	},
];

/** Подсказка: в dev кэши могут быть пустыми или отличаться от preview. */
export const previewHint =
	'В режиме pnpm dev Service Worker и кэши могут быть пустыми или вести себя иначе. Для проверки реальных кэшей Workbox: pnpm build, затем pnpm preview — откройте http://localhost:4173 и обновите список.';

/** Где смотреть Cache Storage в DevTools. */
export const devToolsItems = [
	'Chrome DevTools → Application → Cache Storage — имена кэшей и записи (Request / Response).',
	'Сравните список в UI с Application → Cache Storage после «Обновить».',
	'Раздел Offline в приложении описывает precache и runtime-правила; здесь видны фактические данные в хранилище.',
] as const;
