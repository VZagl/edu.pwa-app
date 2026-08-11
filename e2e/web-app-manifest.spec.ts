import { expect, test } from '@playwright/test';

const MVP_FIELDS = [
	'name',
	'short_name',
	'start_url',
	'display',
	'theme_color',
	'background_color',
	'icons',
] as const;

test.describe('Web App Manifest', () => {
	test('должен отдавать manifest с обязательными полями MVP', async ({ request }) => {
		const response = await request.get('./manifest.webmanifest');

		expect(response.status()).toBe(200);

		const manifest = await response.json();

		for (const field of MVP_FIELDS) {
			expect(manifest, `поле "${field}" должно присутствовать`).toHaveProperty(field);
		}

		expect(manifest.name).toBe('edu.pwa-app — учебное PWA');
		expect(manifest.short_name).toBe('PWA Lab');
		expect(manifest.start_url).toBe('./');
		expect(manifest.display).toBe('standalone');
		expect(manifest.theme_color).toBe('#646cff');
		expect(manifest.background_color).toBe('#ffffff');

		const icons = manifest.icons as Array<{ src: string; sizes: string; type: string }>;
		expect(icons).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' }),
				expect.objectContaining({ src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }),
			]),
		);
	});

	test('должен отдавать иконки 192×192 и 512×512', async ({ request }) => {
		const icon192 = await request.get('./icons/icon-192.png');
		expect(icon192.status()).toBe(200);
		expect(icon192.headers()['content-type']).toContain('image/png');

		const icon512 = await request.get('./icons/icon-512.png');
		expect(icon512.status()).toBe(200);
		expect(icon512.headers()['content-type']).toContain('image/png');
	});
});
