import { expect, test } from '@playwright/test';

test.describe('Урок Web Push', () => {
	test('должен показать ключевые секции на /push', async ({ page }) => {
		await page.goto('/push');

		await expect(page.getByRole('heading', { level: 2 })).toHaveText('Web Push');
		await expect(page.getByText(/даже при закрытой вкладке/i)).toBeVisible();

		await expect(page.getByRole('region', { name: 'Как работает' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Демо: уведомления и подписка' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Роль backend' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'DevTools' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Ограничения' })).toBeVisible();
		await expect(page.getByRole('region', { name: 'Связь с Service Worker' })).toBeVisible();

		const demo = page.getByRole('region', { name: 'Демо: уведомления и подписка' });
		await expect(demo.getByText('supported', { exact: true })).toBeVisible();
		await expect(demo.getByText('permission', { exact: true })).toBeVisible();
		await expect(demo.getByText('hasSubscription', { exact: true })).toBeVisible();

		const how = page.getByRole('region', { name: 'Как работает' });
		await expect(how.getByText('Permission', { exact: true })).toBeVisible();
		await expect(how.getByText(/не доставка с сервера/i)).toBeVisible();

		const limits = page.getByRole('region', { name: 'Ограничения' });
		await expect(limits.getByText(/Safari \/ iOS/i)).toBeVisible();
		await expect(limits.getByText(/Pages ≠ отправитель/i)).toBeVisible();

		const swLink = page.getByRole('region', { name: 'Связь с Service Worker' });
		await expect(swLink.getByRole('link', { name: 'Service Worker' })).toHaveAttribute(
			'href',
			'/service-worker',
		);
	});
});
