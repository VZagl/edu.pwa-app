import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'prompt',
			injectRegister: null,
			manifestFilename: 'manifest.webmanifest',
			includeAssets: ['favicon.svg', 'icons/*.png'],
			manifest: {
				name: 'edu.pwa-app — учебное PWA',
				short_name: 'PWA Lab',
				description: 'Изучение Progressive Web Apps на React и Vite',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#646cff',
				lang: 'ru',
				icons: [
					{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
					{ src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
				navigateFallback: 'index.html',
				navigateFallbackDenylist: [/^\/api\//],
				runtimeCaching: [
					{
						urlPattern: /\.json$/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'runtime-json',
							networkTimeoutSeconds: 5,
							expiration: { maxEntries: 16, maxAgeSeconds: 24 * 60 * 60 },
							cacheableResponse: { statuses: [0, 200] },
						},
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'runtime-images',
							expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 },
						},
					},
				],
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});
