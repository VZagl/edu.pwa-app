import { expect, test } from '@playwright/test';

test.describe('Урок Cache Storage', () => {
	test('должен показать ключевые секции на /cache-storage', async ({ page }) => {
		await page.goto('./cache-storage');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Cache Storage');
		await expect(page.getByText(/браузерное хранилище HTTP-ответов/i)).toBeVisible();

		await expect(page.getByRole('region', { name: 'Cache Storage API' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Демо: живые кэши' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Связь с Offline / Workbox' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'DevTools' })).toBeVisible();

		const api = page.getByRole('region', { name: 'Cache Storage API' });
		await expect(api.getByText('caches.keys()', { exact: true })).toBeVisible();
		await expect(api.getByText('cache.keys()', { exact: true })).toBeVisible();

		const demo = page.getByRole('region', { name: 'Демо: живые кэши' });
		await expect(demo.getByRole('button', { name: 'Обновить список кэшей' })).toBeVisible();

		const workbox = page.getByRole('region', { name: 'Связь с Offline / Workbox' });
		await expect(workbox.getByRole('link', { name: 'Offline' })).toBeVisible();
		await expect(workbox.getByText(/runtime-json/i)).toBeVisible();
	});
});
