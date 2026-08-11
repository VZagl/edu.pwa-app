/** Вводный текст экрана «Установка PWA». */
export const installIntro = [
	'Установка PWA позволяет запускать приложение с иконки на домашнем экране — в режиме standalone, без адресной строки браузера.',
	'Глобальный InstallBanner в шапке использует тот же хук useInstallPrompt, что и демо ниже. Этот раздел объясняет условия installability, display-mode и ручную установку на разных платформах.',
] as const;

export type InstallabilityCriterion = {
	id: string;
	label: string;
	description: string;
};

/** Критерии installability (кратко — полный чеклист в docs/project/pwa-checklist.md). */
export const installabilityCriteria: InstallabilityCriterion[] = [
	{
		id: 'secure-context',
		label: 'Secure context (HTTPS / localhost)',
		description:
			'PWA API доступны только в безопасном контексте. Для разработки localhost считается исключением без HTTPS.',
	},
	{
		id: 'manifest',
		label: 'Валидный Web App Manifest',
		description: 'name, short_name, start_url, display (standalone), иконки 192×192 и 512×512.',
	},
	{
		id: 'service-worker',
		label: 'Зарегистрированный Service Worker',
		description: 'SW должен быть activated и контролировать страницу — иначе браузер не предложит установку.',
	},
	{
		id: 'icons',
		label: 'Иконки для установки',
		description: 'Минимум maskable/icon 192 и 512 px — Chrome проверяет их в Application → Manifest.',
	},
];

export type PlatformInstruction = {
	platform: string;
	method: string;
};

/** Инструкции по платформам: Chromium prompt vs iOS/Safari vs прочие. */
export const platformInstructions: PlatformInstruction[] = [
	{
		platform: 'Chromium (Chrome, Edge, Opera)',
		method:
			'Событие beforeinstallprompt — браузер показывает нативный диалог. В UI: кнопка «Установить» в InstallBanner и в демо ниже.',
	},
	{
		platform: 'iOS / Safari',
		method:
			'beforeinstallprompt не поддерживается. Ручная установка: «Поделиться» → «На экран Домой». В UI показывается fallback-подсказка.',
	},
	{
		platform: 'Firefox, прочие браузеры',
		method:
			'Меню браузера → «Установить» / «Добавить на главный экран». Текст подсказки выбирается по user agent в installFallbackHints.',
	},
];

/** Подсказка: installability надёжнее проверять на production preview. */
export const previewHint =
	'В режиме pnpm dev Service Worker и installability могут вести себя иначе. Для проверки установки: pnpm build, затем pnpm preview — откройте http://localhost:4173 в Chrome.';

/** Где смотреть installability в DevTools. */
export const devToolsItems = [
	'Chrome DevTools → Application → Manifest — валидность manifest, иконки, «Add to home screen» / installability.',
	'Application → Service Workers — статус activated; без SW установка недоступна.',
	'Lighthouse → категория PWA — audit Installable и связанные проверки.',
] as const;
