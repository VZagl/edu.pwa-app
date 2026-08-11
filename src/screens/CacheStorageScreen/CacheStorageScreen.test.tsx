import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	supported: true,
	loading: false,
	error: null as string | null,
	cacheNames: [] as string[],
	selectedCache: null as string | null,
	urls: [] as string[],
	refresh: vi.fn(),
	selectCache: vi.fn(),
}));

vi.mock('../../hooks/useCacheStorage/useCacheStorage.ts', () => ({
	useCacheStorage: () => ({
		supported: hookMocks.supported,
		loading: hookMocks.loading,
		error: hookMocks.error,
		cacheNames: hookMocks.cacheNames,
		selectedCache: hookMocks.selectedCache,
		urls: hookMocks.urls,
		refresh: hookMocks.refresh,
		selectCache: hookMocks.selectCache,
	}),
}));

import { CacheStorageScreen } from './CacheStorageScreen';

function renderScreen() {
	return render(
		<MemoryRouter>
			<CacheStorageScreen />
		</MemoryRouter>,
	);
}

describe('CacheStorageScreen', () => {
	beforeEach(() => {
		hookMocks.supported = true;
		hookMocks.loading = false;
		hookMocks.error = null;
		hookMocks.cacheNames = [];
		hookMocks.selectedCache = null;
		hookMocks.urls = [];
		hookMocks.refresh = vi.fn();
		hookMocks.selectCache = vi.fn();
	});

	it('должен отрендерить заголовок и вводный текст о Cache Storage', () => {
		renderScreen();

		expect(screen.getByRole('heading', { level: 2, name: 'Cache Storage' })).toBeInTheDocument();
		expect(screen.getByText(/браузерное хранилище HTTP-ответов/i)).toBeInTheDocument();
		expect(screen.getByText(/только ключи \(Request URL\)/i)).toBeInTheDocument();
	});

	it('должен показать секцию Cache Storage API с caches.keys, open и cache.keys', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Cache Storage API' });

		expect(within(section).getByText('caches.keys()')).toBeInTheDocument();
		expect(within(section).getByText('caches.open(name)')).toBeInTheDocument();
		expect(within(section).getByText('cache.keys()')).toBeInTheDocument();
	});

	it('должен показать empty-состояние, если кэшей нет', () => {
		renderScreen();

		const demo = screen.getByRole('region', { name: 'Демо: живые кэши' });

		expect(within(demo).getByRole('status', { name: 'Кэши отсутствуют' })).toBeInTheDocument();
	});

	it('должен показать список кэшей и загрузить URL при выборе', async () => {
		hookMocks.cacheNames = ['runtime-json', 'runtime-images'];

		renderScreen();

		const demo = screen.getByRole('region', { name: 'Демо: живые кэши' });

		expect(within(demo).getByRole('button', { name: 'Выбрать кэш runtime-json' })).toBeInTheDocument();
		expect(within(demo).getByRole('button', { name: 'Выбрать кэш runtime-images' })).toBeInTheDocument();
		expect(within(demo).getByText(/Выберите кэш/i)).toBeInTheDocument();

		await userEvent.click(within(demo).getByRole('button', { name: 'Выбрать кэш runtime-json' }));
		expect(hookMocks.selectCache).toHaveBeenCalledWith('runtime-json');
	});

	it('должен показать URL выбранного кэша', () => {
		hookMocks.cacheNames = ['runtime-json'];
		hookMocks.selectedCache = 'runtime-json';
		hookMocks.urls = ['http://localhost/data.json'];

		renderScreen();

		const demo = screen.getByRole('region', { name: 'Демо: живые кэши' });

		expect(within(demo).getByText('http://localhost/data.json')).toBeInTheDocument();
	});

	it('должен вызвать refresh по кнопке «Обновить»', async () => {
		hookMocks.cacheNames = ['runtime-json'];

		renderScreen();

		const demo = screen.getByRole('region', { name: 'Демо: живые кэши' });
		await userEvent.click(within(demo).getByRole('button', { name: 'Обновить список кэшей' }));

		expect(hookMocks.refresh).toHaveBeenCalledOnce();
	});

	it('должен показать unsupported-состояние', () => {
		hookMocks.supported = false;

		renderScreen();

		const demo = screen.getByRole('region', { name: 'Демо: живые кэши' });

		expect(within(demo).getByRole('status', { name: 'Cache Storage не поддерживается' })).toBeInTheDocument();
	});

	it('должен показать секции Workbox и DevTools', () => {
		renderScreen();

		const workbox = screen.getByRole('region', { name: 'Связь с Offline / Workbox' });
		expect(within(workbox).getByText(/runtime-json/i)).toBeInTheDocument();
		expect(within(workbox).getByRole('link', { name: 'Offline' })).toHaveAttribute('href', '/offline');

		const devtools = screen.getByRole('region', { name: 'DevTools' });
		expect(within(devtools).getByText(/Chrome DevTools → Application → Cache Storage/i)).toBeInTheDocument();
	});
});
