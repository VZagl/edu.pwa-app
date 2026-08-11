/** Вводный текст экрана «Storage». */
export const storageIntro = [
	'Storage quota показывает, сколько места origin уже занимает и какой приблизительный лимит выделил браузер (IndexedDB, Cache Storage, OPFS и др.).',
	'Persistent Storage снижает риск вытеснения данных при нехватке места на устройстве. Значения estimate() approximate — это не точный учёт байт.',
] as const;

export type ApiMethodItem = {
	id: string;
	label: string;
	description: string;
};

/** Ключевые методы StorageManager для урока. */
export const apiMethods: ApiMethodItem[] = [
	{
		id: 'estimate',
		label: 'navigator.storage.estimate()',
		description:
			'Возвращает Promise с usage и quota (байты). Значения приблизительные: сжатие, дедупликация и защита от fingerprinting.',
	},
	{
		id: 'persisted',
		label: 'navigator.storage.persisted()',
		description: 'Сообщает, помечено ли хранилище origin как persistent прямо сейчас.',
	},
	{
		id: 'persist',
		label: 'navigator.storage.persist()',
		description:
			'Запрашивает Persistent Storage. Браузер может отказать (false) без диалога — это нормально для демо.',
	},
];

export type LimitHint = {
	id: string;
	title: string;
	description: string;
};

/** Краткие пояснения про лимиты и вытеснение. */
export const limitsHints: LimitHint[] = [
	{
		id: 'quota',
		title: 'Квота origin',
		description:
			'Лимит зависит от устройства, свободного места и «доверия» к сайту (частота визитов, установка PWA и т.п.).',
	},
	{
		id: 'eviction',
		title: 'Вытеснение (eviction)',
		description:
			'При нехватке места браузер может удалить данные «менее ценных» origin. Persistent снижает этот риск, но не гарантирует вечное хранение.',
	},
	{
		id: 'approximate',
		title: 'Approximate значения',
		description: 'usage/quota — оценка. Не сравнивайте их побайтово с суммой размеров файлов в DevTools.',
	},
];

/** Где смотреть Storage в DevTools. */
export const devToolsItems = [
	'Chrome DevTools → Application → Storage — usage / quota и кнопка Clear site data.',
	'Сравните цифры в UI с Application → Storage после «Обновить».',
	'Раздел Cache Storage в приложении показывает содержимое кэшей; здесь — общая квота origin.',
] as const;
