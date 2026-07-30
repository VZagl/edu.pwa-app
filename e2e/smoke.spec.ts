import { expect, test } from '@playwright/test';

test.describe('Smoke E2E', () => {
	test('должен открыть главную страницу приложения', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle('edu.pwa-app');

		const root = page.locator('#root');
		await expect(root).toBeVisible();
		await expect(root).not.toBeEmpty();
	});
});
