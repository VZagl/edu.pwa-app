/** Вводный текст экрана Web Push. */
export const pushIntro = [
	'Web Push позволяет серверу доставить сообщение в браузер даже при закрытой вкладке — через push-сервис браузера и Service Worker.',
	'Важно не путать: локальное Notification API (кнопка «показать уведомление») ≠ удалённый Web Push с сервера. В этом уроке backend отправки нет — только живые Permission, подписка и локальный демо-notify.',
] as const;

export type PushChainStep = {
	id: string;
	label: string;
	description: string;
};

/** Упрощённая цепочка Web Push для учебного контента. */
export const pushChainSteps: PushChainStep[] = [
	{
		id: 'permission',
		label: 'Permission',
		description: 'Пользователь явно разрешает уведомления (default → granted / denied).',
	},
	{
		id: 'subscribe',
		label: 'PushManager.subscribe',
		description: 'Браузер создаёт подписку у push-сервиса с VAPID public key (не у вашего API напрямую).',
	},
	{
		id: 'subscription',
		label: 'PushSubscription',
		description: 'Объект с endpoint и ключами; в проде его сохраняют на backend.',
	},
	{
		id: 'backend',
		label: 'Backend → push-сервис',
		description: 'Сервер подписывает запрос VAPID private и отправляет payload на endpoint.',
	},
	{
		id: 'sw',
		label: 'Service Worker',
		description: 'События push (показать уведомление) и notificationclick (открыть/сфокусировать окно).',
	},
];

export type BackendDuty = {
	id: string;
	title: string;
	description: string;
};

/** Что делает backend в реальном приложении (в этом repo его нет). */
export const backendDuties: BackendDuty[] = [
	{
		id: 'store',
		title: 'Сохранить подписку',
		description: 'Принять PushSubscription (endpoint, keys) и привязать к пользователю/устройству.',
	},
	{
		id: 'vapid',
		title: 'Хранить VAPID private',
		description: 'Private key только в секретах окружения — не в git и не в статике GitHub Pages.',
	},
	{
		id: 'send',
		title: 'Отправить Web Push',
		description: 'Подпись VAPID, шифрование payload, HTTP POST на endpoint (например web-push).',
	},
	{
		id: 'cleanup',
		title: 'Очистка и отписка',
		description: 'Удалять истекшие подписки (410 Gone) и обрабатывать unsubscribe.',
	},
];

/** Где симулировать push в DevTools без backend. */
export const pushDevToolsItems = [
	'Chrome DevTools → Application → Service Workers → Push — отправить тестовое событие push в SW.',
	'Application → Notifications — посмотреть разрешения и историю уведомлений.',
	'Консоль / Network — endpoint подписки; отправка с сервера в этом уроке не выполняется.',
] as const;

/** Ограничения платформ и деплоя. */
export const pushLimitsItems = [
	'HTTPS / secure context обязательны (localhost — исключение для разработки).',
	'Safari / iOS: Web Push для веба ограничен; часто нужен Add to Home Screen и конкретные версии ОС.',
	'GitHub Pages даёт HTTPS-статику, но не выполняет серверный код — Pages ≠ отправитель push.',
	'Permission denied меняется только в настройках браузера — страница не «перезапросит» бесконечно.',
] as const;

/** Подсказка про preview и SW. */
export const pushPreviewHint =
	'Для надёжной проверки SW и Push: pnpm build, затем pnpm preview. В dev поведение Service Worker может отличаться.';
