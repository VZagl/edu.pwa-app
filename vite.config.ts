import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

const require = createRequire(import.meta.url);
const { version } = require('./package.json') as { version: string };

// https://vite.dev/config/
export default defineConfig({
	// Project site GitHub Pages: https://vzagl.github.io/edu.pwa-app/
	base: '/edu.pwa-app/',
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
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
				// Relative: plugin + base соберут корректные URL под subdirectory
				start_url: './',
				scope: './',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#646cff',
				lang: 'ru',
				icons: [
					{ src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
					{ src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
				],
			},
			workbox: {
				importScripts: ['sw-push.js'],
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
