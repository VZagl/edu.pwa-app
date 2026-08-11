import { expect, test } from '@playwright/test';

test.describe('Урок Service Worker', () => {
	test('должен показать ключевые секции на /service-worker', async ({ page }) => {
		await page.goto('./service-worker');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Service Worker');
		await expect(page.getByText(/отдельный скрипт, который браузер запускает в фоне/i)).toBeVisible();

		await expect(page.getByRole('region', { name: 'Введение' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Жизненный цикл' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Демо: статус SW' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Обновление Service Worker' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Сброс для лаборатории' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Дальше: кэширование' })).toBeVisible();

		const demo = page.getByRole('region', { name: 'Демо: статус SW' });
		await expect(demo.getByText('scope', { exact: true })).toBeVisible();
		await expect(demo.getByText('revision (scriptURL)')).toBeVisible();

		const reset = page.getByRole('region', { name: 'Сброс для лаборатории' });
		await expect(reset.getByRole('button', { name: 'Сбросить SW и кэш' })).toBeVisible();
		await expect(reset.getByText(/только для лаборатории/i)).toBeVisible();

		await expect(page.getByRole('link', { name: 'Офлайн и кэш' })).toBeVisible();
	});
});
