import { expect, test } from '@playwright/test';

test.describe('Навигация по учебным разделам', () => {
	test('должен переключаться между разделами уроков', async ({ page }) => {
		await page.goto('/');

		const nav = page.getByRole('navigation');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Карта лаборатории');

		await nav.getByRole('link', { name: 'Manifest' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Web App Manifest');

		await nav.getByRole('link', { name: 'Service Worker' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Service Worker');

		await nav.getByRole('link', { name: 'Offline' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Офлайн и кэш');

		await nav.getByRole('link', { name: 'Install' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Установка PWA');

		await nav.getByRole('link', { name: 'Cache Storage' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Cache Storage');

		await nav.getByRole('link', { name: 'Главная' }).click();
		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Карта лаборатории');
	});
});
