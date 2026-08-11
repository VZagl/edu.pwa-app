import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	supported: true,
	permission: 'default' as NotificationPermission,
	subscription: null as { endpoint: string } | null,
	error: null as string | null,
	message: null as string | null,
	requestPermission: vi.fn(),
	subscribe: vi.fn(),
	unsubscribe: vi.fn(),
	showLocalNotification: vi.fn(),
}));

vi.mock('../../hooks/usePushNotifications/usePushNotifications.ts', () => ({
	usePushNotifications: () => ({
		supported: hookMocks.supported,
		permission: hookMocks.permission,
		subscription: hookMocks.subscription,
		error: hookMocks.error,
		message: hookMocks.message,
		requestPermission: hookMocks.requestPermission,
		subscribe: hookMocks.subscribe,
		unsubscribe: hookMocks.unsubscribe,
		showLocalNotification: hookMocks.showLocalNotification,
	}),
}));

import { PushScreen } from './PushScreen';

function renderScreen() {
	return render(
		<MemoryRouter>
			<PushScreen />
		</MemoryRouter>,
	);
}

describe('PushScreen', () => {
	beforeEach(() => {
		hookMocks.supported = true;
		hookMocks.permission = 'default';
		hookMocks.subscription = null;
		hookMocks.error = null;
		hookMocks.message = null;
		hookMocks.requestPermission = vi.fn();
		hookMocks.subscribe = vi.fn();
		hookMocks.unsubscribe = vi.fn();
		hookMocks.showLocalNotification = vi.fn();
	});

	it('должен отрендерить заголовок и вводный текст о Web Push', () => {
		renderScreen();

		expect(screen.getByRole('heading', { level: 2, name: 'Web Push' })).toBeInTheDocument();
		expect(screen.getByText(/даже при закрытой вкладке/i)).toBeInTheDocument();
		expect(screen.getByText(/локальное Notification API/i)).toBeInTheDocument();
	});

	it('должен показать секцию «Как работает» с цепочкой Permission и SW', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Как работает' });

		expect(within(section).getByText('Permission')).toBeInTheDocument();
		expect(within(section).getByText('PushManager.subscribe')).toBeInTheDocument();
		expect(within(section).getByText('Service Worker')).toBeInTheDocument();
		expect(within(section).getByText(/не доставка с сервера/i)).toBeInTheDocument();
	});

	it('должен показать кнопку «Запросить разрешение» при permission default', async () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Демо: уведомления и подписка' });
		const button = within(section).getByRole('button', { name: 'Запросить разрешение на уведомления' });

		expect(within(section).getByRole('status', { name: 'Ожидание разрешения' })).toBeInTheDocument();

		await userEvent.click(button);
		expect(hookMocks.requestPermission).toHaveBeenCalledOnce();
	});

	it('должен показать кнопки подписки и локального уведомления при granted', async () => {
		hookMocks.permission = 'granted';

		renderScreen();

		const section = screen.getByRole('region', { name: 'Демо: уведомления и подписка' });

		expect(within(section).getByRole('status', { name: 'Разрешено' })).toBeInTheDocument();

		await userEvent.click(within(section).getByRole('button', { name: 'Подписаться на push' }));
		expect(hookMocks.subscribe).toHaveBeenCalledOnce();

		await userEvent.click(within(section).getByRole('button', { name: 'Показать локальное уведомление' }));
		expect(hookMocks.showLocalNotification).toHaveBeenCalledOnce();
	});

	it('должен показать отписку и endpoint при активной подписке', async () => {
		hookMocks.permission = 'granted';
		hookMocks.subscription = { endpoint: 'https://push.example/endpoint-very-long-path-abc123' };

		renderScreen();

		const section = screen.getByRole('region', { name: 'Демо: уведомления и подписка' });

		expect(within(section).getByRole('status', { name: 'Подписано' })).toBeInTheDocument();
		expect(within(section).getByText(/push\.example/i)).toBeInTheDocument();

		await userEvent.click(within(section).getByRole('button', { name: 'Отписаться от push' }));
		expect(hookMocks.unsubscribe).toHaveBeenCalledOnce();
	});

	it('должен показать секции backend, DevTools, ограничений и ссылку на SW', () => {
		renderScreen();

		const backend = screen.getByRole('region', { name: 'Роль backend' });
		expect(within(backend).getByText('Сохранить подписку')).toBeInTheDocument();
		expect(within(backend).getByText(/VAPID private/i)).toBeInTheDocument();

		const devtools = screen.getByRole('region', { name: 'DevTools' });
		expect(within(devtools).getByText(/Application → Service Workers → Push/i)).toBeInTheDocument();

		const limits = screen.getByRole('region', { name: 'Ограничения' });
		expect(within(limits).getByText(/Safari \/ iOS/i)).toBeInTheDocument();
		expect(within(limits).getByText(/Pages ≠ отправитель/i)).toBeInTheDocument();

		const swLink = screen.getByRole('region', { name: 'Связь с Service Worker' });
		expect(within(swLink).getByRole('link', { name: 'Service Worker' })).toHaveAttribute(
			'href',
			'/service-worker',
		);
	});
});
