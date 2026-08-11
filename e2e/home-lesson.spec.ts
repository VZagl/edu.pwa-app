import { expect, test } from '@playwright/test';

test.describe('Урок Главная — карта лаборатории', () => {
	test('должен показать ключевые блоки и перейти в модуль Manifest', async ({ page }) => {
		await page.goto('./');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Карта лаборатории');
		await expect(page.getByText(/учебн(ое|ого) PWA/i)).toBeVisible();

		const modules = page.getByRole('region', { name: 'Модули' });
		await expect(modules).toBeVisible();
		await expect(modules.getByRole('link', { name: 'Manifest' })).toBeVisible();
		await expect(modules.getByRole('link', { name: 'Service Worker' })).toBeVisible();
		await expect(modules.getByRole('link', { name: 'Offline' })).toBeVisible();
		await expect(modules.getByRole('link', { name: 'Install' })).toBeVisible();

		await expect(page.getByRole('region', { name: 'Чеклист PWA' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Как пользоваться' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Почему HTTPS' })).toBeVisible();

		await modules.getByRole('link', { name: 'Manifest' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Web App Manifest');
	});
});
