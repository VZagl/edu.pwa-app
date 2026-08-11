import { expect, test } from '@playwright/test';

test.describe('Smoke E2E', () => {
	test('должен открыть главную страницу приложения', async ({ page }) => {
		await page.goto('./');

		await expect(page).toHaveTitle('edu.pwa-app');

		const header = page.getByRole('banner');
		await expect(header).toBeVisible();
		await expect(header.getByRole('heading', { level: 1 })).toHaveText('edu.pwa-app');

		await expect(page.getByRole('navigation')).toBeVisible();

		const main = page.getByRole('main');
		await expect(main).toBeVisible();
		await expect(main.getByRole('heading', { level: 2 })).toHaveText('Карта лаборатории');
	});
});
