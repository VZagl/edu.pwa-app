import { expect, test } from '@playwright/test';

test.describe('Урок Manifest', () => {
	test('должен показать объяснение и значения из manifest', async ({ page }) => {
		await page.goto('/manifest');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Web App Manifest');
		await expect(page.getByText(/Web App Manifest — это JSON-файл/i)).toBeVisible();

		const section = page.getByRole('region', { name: 'Текущие значения manifest' });
		await expect(section).toBeVisible();

		await expect(section.getByText('edu.pwa-app — учебное PWA')).toBeVisible();
		await expect(section.getByText('PWA Lab')).toBeVisible();
		await expect(section.getByText('standalone')).toBeVisible();
		await expect(section.getByText('#646cff')).toBeVisible();
		await expect(section.getByText('#ffffff')).toBeVisible();
		await expect(section.getByText('/icons/icon-192.png')).toBeVisible();
	});
});
