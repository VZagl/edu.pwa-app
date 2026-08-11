export const precacheInfo = {
	globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
	description:
		'При установке service worker Workbox автоматически кэширует статические ресурсы сборки (precache) по шаблонам globPatterns.',
} as const;

export type RuntimeRule = {
	urlPattern: string;
	handler: string;
	cacheName: string;
	networkTimeoutSeconds?: number;
};

export const runtimeRules: RuntimeRule[] = [
	{
		urlPattern: '/\\.json$/i',
		handler: 'NetworkFirst',
		cacheName: 'runtime-json',
		networkTimeoutSeconds: 5,
	},
	{
		urlPattern: '/\\.(?:png|jpg|jpeg|svg|gif|webp)$/i',
		handler: 'StaleWhileRevalidate',
		cacheName: 'runtime-images',
	},
];

export const navigateFallback = 'index.html';
