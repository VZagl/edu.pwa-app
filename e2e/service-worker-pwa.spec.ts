import { expect, test } from '@playwright/test';

test.describe('Service Worker (vite-plugin-pwa)', () => {
	test('должен загрузить главную страницу после preview', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle('edu.pwa-app');
		await expect(page.getByRole('main')).toBeVisible();
	});

	test('должен отдавать /sw.js с Workbox precache', async ({ request }) => {
		const response = await request.get('/sw.js');

		expect(response.status()).toBe(200);

		const body = await response.text();
		expect(body).toMatch(/workbox|precache/i);
	});

	test('должен зарегистрировать Service Worker со scope /', async ({ page }) => {
		await page.goto('/');

		const scopeHandle = await page.waitForFunction(
			async () => {
				const reg = await navigator.serviceWorker.getRegistration();
				return reg?.scope ?? null;
			},
			undefined,
			{ timeout: 15_000 },
		);

		const scope = await scopeHandle.jsonValue();
		expect(scope).not.toBeNull();
		expect(scope as string).toMatch(/\/$/);
	});

	// Полный flow обновления (build → preview → rebuild → refresh) — ручная проверка в reflection.
	test('баннер обновления не должен быть виден при первой загрузке', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByText('Доступно обновление')).not.toBeVisible();
	});
});
