import { expect, test } from '@playwright/test';

test.describe('Навигация по учебным разделам', () => {
	test('должен переключаться между разделами уроков', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Добро пожаловать');

		await page.getByRole('link', { name: 'Manifest' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Web App Manifest');

		await page.getByRole('link', { name: 'Service Worker' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Service Worker');

		await page.getByRole('link', { name: 'Offline' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Офлайн и кэш');

		await page.getByRole('link', { name: 'Install' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Установка PWA');

		await page.getByRole('link', { name: 'Главная' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Добро пожаловать');
	});
});
