import { expect, test } from '@playwright/test';

test.describe('Урок Storage', () => {
	test('должен показать ключевые секции на /storage', async ({ page }) => {
		await page.goto('./storage');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Storage');
		await expect(page.getByText(/Storage quota показывает/i)).toBeVisible();

		await expect(page.getByRole('region', { name: 'Storage API' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Демо: квота и Persistent' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Лимиты и вытеснение' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'DevTools' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Связь с Cache Storage' })).toBeVisible();

		const api = page.getByRole('region', { name: 'Storage API' });
		await expect(api.getByText('navigator.storage.estimate()', { exact: true })).toBeVisible();
		await expect(api.getByText('navigator.storage.persist()', { exact: true })).toBeVisible();

		const demo = page.getByRole('region', { name: 'Демо: квота и Persistent' });
		await expect(demo.getByRole('button', { name: 'Обновить оценку хранилища' })).toBeVisible();
		await expect(demo.getByRole('button', { name: 'Запросить Persistent Storage' })).toBeVisible();

		const linkSection = page.getByRole('region', { name: 'Связь с Cache Storage' });
		await expect(linkSection.getByRole('link', { name: 'Cache Storage' })).toBeVisible();
	});
});
