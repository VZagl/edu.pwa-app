import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchManifest } from './fetchManifest';
import type { WebAppManifest } from './types';

const mockManifest: WebAppManifest = {
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
};

describe('fetchManifest', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('должен загрузить и вернуть JSON манифеста', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockManifest),
			}),
		);

		const result = await fetchManifest();

		expect(fetch).toHaveBeenCalledWith('/manifest.webmanifest');
		expect(result).toEqual(mockManifest);
	});

	it('должен выбросить ошибку при неуспешном ответе', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: false,
				status: 404,
			}),
		);

		await expect(fetchManifest()).rejects.toThrow('Не удалось загрузить манифест');
	});
});
