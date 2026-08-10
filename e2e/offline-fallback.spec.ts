import { expect, test } from '@playwright/test';

test.describe('Offline fallback', () => {
	test('должен показать индикатор offline и сохранить навигацию по SPA', async ({ page, context }) => {
		await page.goto('/');

		await page.waitForFunction(
			async () => {
				const reg = await navigator.serviceWorker.getRegistration();
				return reg?.active?.state === 'activated';
			},
			undefined,
			{ timeout: 15_000 },
		);

		await context.setOffline(true);

		await expect(page.getByRole('status', { name: 'Нет сети' })).toBeVisible();

		await page.getByRole('navigation').getByRole('link', { name: 'Manifest' }).click();

		await expect(page.getByRole('main')).toBeVisible();
		await expect(page).toHaveURL(/\/manifest$/);

		await context.setOffline(false);

		await expect(page.getByRole('status', { name: 'Нет сети' })).not.toBeVisible();
	});
});
