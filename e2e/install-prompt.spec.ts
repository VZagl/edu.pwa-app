import { expect, test } from '@playwright/test';

test.describe('Install prompt', () => {
	test('должен показать баннер установки после grace period', async ({ page }) => {
		await page.goto('/');

		await page.waitForFunction(
			async () => {
				const reg = await navigator.serviceWorker.getRegistration();
				return reg?.active?.state === 'activated';
			},
			undefined,
			{ timeout: 15_000 },
		);

		const installBanner = page.getByRole('status').filter({
			hasText: /Установите приложение|Установите через меню|Поделиться|меню браузера|Добавить в Dock/i,
		});

		await expect(installBanner).toBeVisible({ timeout: 5_000 });

		const installButton = page.getByRole('button', { name: 'Установить приложение' });
		if (await installButton.isVisible()) {
			await expect(installButton).toBeVisible();
		}
	});
});
