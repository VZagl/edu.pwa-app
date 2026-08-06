import { expect, test } from '@playwright/test';

test.describe('Урок Offline & Cache', () => {
	test('должен показать объяснение, стратегии кэширования и статус сети', async ({ page }) => {
		await page.goto('/offline');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Офлайн и кэш');
		await expect(page.getByText(/кэширование позволяет PWA/i)).toBeVisible();
		await expect(page.getByText(/статические файлы сборки кэшируются при установке SW/i)).toBeVisible();
		await expect(page.getByText(/правила для запросов во время работы приложения/i)).toBeVisible();

		const strategies = page.getByRole('region', { name: 'Стратегии кэширования' });
		await expect(strategies).toBeVisible();
		await expect(strategies.getByText('NetworkFirst')).toBeVisible();
		await expect(strategies.getByText('StaleWhileRevalidate')).toBeVisible();
		await expect(strategies.getByText('index.html')).toBeVisible();

		const demo = page.getByRole('region', { name: 'Демо: статус сети' });
		await expect(demo).toBeVisible();
		await expect(demo.getByRole('status', { name: 'В сети' })).toBeVisible();
	});
});
