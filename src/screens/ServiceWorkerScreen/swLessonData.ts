/** Вводный текст экрана «Service Worker». */
export const swIntro = [
	'Service Worker — это отдельный скрипт, который браузер запускает в фоне. Он перехватывает сетевые запросы, кэширует ресурсы и может работать без открытой вкладки.',
	'В отличие от обычного <script> на странице, SW имеет собственный scope (путь регистрации с учётом base приложения): он не видит DOM и контролирует только URL внутри scope.',
] as const;

export type LifecycleStep = {
	phase: string;
	description: string;
};

/** Этапы жизненного цикла Service Worker. */
export const lifecycleSteps: LifecycleStep[] = [
	{
		phase: 'install',
		description:
			'Браузер загружает новый SW-файл. Событие install — место для precache и подготовки кэша перед активацией.',
	},
	{
		phase: 'activate',
		description:
			'После install SW переходит в activate: удаляет устаревшие кэши и готовится управлять страницами в scope.',
	},
	{
		phase: 'controlling / waiting',
		description:
			'Активный SW контролирует открытые вкладки (controlling). Если уже есть активный SW, новая версия ждёт в состоянии waiting, пока все вкладки не закроются или не придёт команда skipWaiting.',
	},
];

/** Подсказка: SW отключён в режиме разработки Vite. */
export const devModeHint =
	'В режиме pnpm dev Service Worker отключён (vite-plugin-pwa). Для живого демо соберите production-сборку: pnpm build, затем откройте pnpm preview.';

/** Описание связи update flow с swUpdateController и SwUpdateBanner. */
export const updateFlowDescription =
	'При registerType: prompt vite-plugin-pwa регистрирует SW через virtual:pwa-register. Пока новый worker в состоянии installing (фоновый precache), swUpdateController выставляет isDownloading — SwUpdateBanner показывает «Загружается обновление…» без процента. Когда worker переходит в waiting, onNeedRefresh снимает прогресс и предлагает кнопку «Обновить» (skipWaiting + reload). После клика — «Обновляется…» без индикатора загрузки.';

/** Предупреждение к учебной кнопке сброса. */
export const resetLabWarning =
	'Только для лаборатории: удаляет все регистрации SW и очищает Cache Storage, затем перезагружает страницу. На production так не делают — обновления идут через update flow, устаревшие кэши удаляются в activate.';

/** Текст перекрёстной ссылки на раздел Offline. */
export const offlineLinkText =
	'Стратегии кэширования (precache, runtime rules, navigateFallback) — в разделе «Офлайн и кэш».';
