import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	supported: true,
	loading: false,
	error: null as string | null,
	usage: null as number | null,
	quota: null as number | null,
	persisted: null as boolean | null,
	refresh: vi.fn(),
	requestPersist: vi.fn(),
}));

vi.mock('../../hooks/useStorageQuota/useStorageQuota.ts', async (importOriginal) => {
	const actual = await importOriginal<typeof import('../../hooks/useStorageQuota/useStorageQuota.ts')>();

	return {
		...actual,
		useStorageQuota: () => ({
			supported: hookMocks.supported,
			loading: hookMocks.loading,
			error: hookMocks.error,
			usage: hookMocks.usage,
			quota: hookMocks.quota,
			persisted: hookMocks.persisted,
			refresh: hookMocks.refresh,
			requestPersist: hookMocks.requestPersist,
		}),
	};
});

import { StorageScreen } from './StorageScreen';

function renderScreen() {
	return render(
		<MemoryRouter>
			<StorageScreen />
		</MemoryRouter>,
	);
}

describe('StorageScreen', () => {
	beforeEach(() => {
		hookMocks.supported = true;
		hookMocks.loading = false;
		hookMocks.error = null;
		hookMocks.usage = null;
		hookMocks.quota = null;
		hookMocks.persisted = null;
		hookMocks.refresh = vi.fn();
		hookMocks.requestPersist = vi.fn();
	});

	it('должен отрендерить заголовок и вводный текст о квотах', () => {
		renderScreen();

		expect(screen.getByRole('heading', { level: 2, name: 'Storage' })).toBeInTheDocument();
		expect(screen.getByText(/Storage quota показывает/i)).toBeInTheDocument();
		expect(screen.getByText(/estimate\(\) approximate/i)).toBeInTheDocument();
	});

	it('должен показать секцию Storage API с estimate, persisted и persist', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Storage API' });

		expect(within(section).getByText('navigator.storage.estimate()')).toBeInTheDocument();
		expect(within(section).getByText('navigator.storage.persisted()')).toBeInTheDocument();
		expect(within(section).getByText('navigator.storage.persist()')).toBeInTheDocument();
	});

	it('должен показать usage, quota, процент и статус persisted', () => {
		hookMocks.usage = 1024;
		hookMocks.quota = 4096;
		hookMocks.persisted = false;

		renderScreen();

		const demo = screen.getByRole('region', { name: 'Демо: квота и Persistent' });
		const stats = within(demo).getByLabelText('Оценка хранилища');

		expect(within(stats).getByText(/1024/)).toBeInTheDocument();
		expect(within(stats).getByText(/4096/)).toBeInTheDocument();
		expect(within(demo).getByLabelText('Процент заполнения')).toHaveTextContent('25.00%');
		expect(within(demo).getByLabelText('Статус Persistent Storage')).toHaveTextContent(
			/нет \(может быть вытеснено\)/i,
		);
	});

	it('должен вызвать refresh и requestPersist по кнопкам', async () => {
		hookMocks.usage = 10;
		hookMocks.quota = 100;

		renderScreen();

		const demo = screen.getByRole('region', { name: 'Демо: квота и Persistent' });

		await userEvent.click(within(demo).getByRole('button', { name: 'Обновить оценку хранилища' }));
		expect(hookMocks.refresh).toHaveBeenCalledOnce();

		await userEvent.click(within(demo).getByRole('button', { name: 'Запросить Persistent Storage' }));
		expect(hookMocks.requestPersist).toHaveBeenCalledOnce();
	});

	it('должен показать unsupported-состояние', () => {
		hookMocks.supported = false;

		renderScreen();

		const demo = screen.getByRole('region', { name: 'Демо: квота и Persistent' });

		expect(within(demo).getByRole('status', { name: 'Storage API не поддерживается' })).toBeInTheDocument();
	});

	it('должен показать секции лимитов, DevTools и ссылку на Cache Storage', () => {
		renderScreen();

		const limits = screen.getByRole('region', { name: 'Лимиты и вытеснение' });
		expect(within(limits).getByText('Вытеснение (eviction)')).toBeInTheDocument();

		const devtools = screen.getByRole('region', { name: 'DevTools' });
		expect(within(devtools).getByText(/Clear site data/i)).toBeInTheDocument();

		const linkSection = screen.getByRole('region', { name: 'Связь с Cache Storage' });
		expect(within(linkSection).getByRole('link', { name: 'Cache Storage' })).toHaveAttribute(
			'href',
			'/cache-storage',
		);
	});
});
