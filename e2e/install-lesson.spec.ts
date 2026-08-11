import { expect, test } from '@playwright/test';

test.describe('Урок Install', () => {
	test('должен показать ключевые секции на /install', async ({ page }) => {
		await page.goto('/install');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Установка PWA');
		await expect(page.getByText(/иконки на домашнем экране/i)).toBeVisible();

		await expect(page.getByRole('region', { name: 'Условия installability' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Демо: статус установки' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'display-mode' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Инструкции по платформам' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'DevTools' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Связь с баннером' })).toBeVisible();

		const demo = page.getByRole('region', { name: 'Демо: статус установки' });
		await expect(demo.getByText('canInstall', { exact: true })).toBeVisible();
		await expect(demo.getByText('isInstalled', { exact: true })).toBeVisible();

		const platforms = page.getByRole('region', { name: 'Инструкции по платформам' });
		await expect(platforms.getByText(/Chromium/i)).toBeVisible();
		await expect(platforms.getByText(/На экран Домой/i)).toBeVisible();

		const banner = page.getByRole('region', { name: 'Связь с баннером' });
		await expect(banner.getByText('InstallBanner', { exact: true })).toBeVisible();
	});
});
