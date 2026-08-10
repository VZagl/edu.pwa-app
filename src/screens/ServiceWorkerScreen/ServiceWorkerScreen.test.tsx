import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import type { ServiceWorkerInfoState } from '../../hooks/useServiceWorkerInfo/useServiceWorkerInfo.ts';

const hookMocks = vi.hoisted(() => ({
	swInfo: {
		supported: true,
		loading: false,
		scope: 'http://localhost/',
		activeState: 'activated',
		waitingState: null,
		installingState: null,
		hasController: true,
		controllerScriptUrl: 'http://localhost/sw.js?v=test-rev',
	} as ServiceWorkerInfoState,
	updateAvailable: false,
}));

vi.mock('../../hooks/useServiceWorkerInfo/useServiceWorkerInfo.ts', () => ({
	useServiceWorkerInfo: () => hookMocks.swInfo,
}));

vi.mock('../../hooks/useSwUpdate.ts', () => ({
	useSwUpdate: () => ({
		updateAvailable: hookMocks.updateAvailable,
		applyUpdate: vi.fn(),
	}),
}));

vi.mock('../../pwa/resetServiceWorkerLab.ts', () => ({
	resetServiceWorkerLab: vi.fn(),
}));

import { ServiceWorkerScreen } from './ServiceWorkerScreen';

function renderScreen() {
	return render(
		<MemoryRouter>
			<ServiceWorkerScreen />
		</MemoryRouter>,
	);
}

describe('ServiceWorkerScreen', () => {
	it('должен отрендерить заголовок и вводный текст о scope и отличии от script', () => {
		renderScreen();

		expect(screen.getByRole('heading', { level: 2, name: 'Service Worker' })).toBeInTheDocument();
		expect(screen.getByText(/отдельный скрипт, который браузер запускает в фоне/i)).toBeInTheDocument();
		expect(screen.getByText(/В отличие от обычного/i)).toBeInTheDocument();
		expect(screen.getByText(/собственный scope/i)).toBeInTheDocument();
	});

	it('должен показать секцию жизненного цикла с install, activate и controlling', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Жизненный цикл' });

		expect(within(section).getByText('install')).toBeInTheDocument();
		expect(within(section).getByText('activate')).toBeInTheDocument();
		expect(within(section).getByText('controlling / waiting')).toBeInTheDocument();
		expect(within(section).getByText(/precache/i)).toBeInTheDocument();
		expect(within(section).getByText(/skipWaiting/i)).toBeInTheDocument();
	});

	it('должен показать живое демо со scope, states и revision', () => {
		hookMocks.swInfo = {
			supported: true,
			loading: false,
			scope: 'http://localhost/',
			activeState: 'activated',
			waitingState: 'installed',
			installingState: null,
			hasController: true,
			controllerScriptUrl: 'http://localhost/sw.js?v=test-rev',
		};

		renderScreen();

		const section = screen.getByRole('region', { name: 'Демо: статус SW' });

		expect(within(section).getByText('http://localhost/')).toBeInTheDocument();
		expect(within(section).getByText('activated')).toBeInTheDocument();
		expect(within(section).getByText('installed')).toBeInTheDocument();
		expect(within(section).getByText('http://localhost/sw.js?v=test-rev')).toBeInTheDocument();
		expect(within(section).getByRole('status', { name: 'Контролирует страницу' })).toBeInTheDocument();
	});

	it('должен показать секцию update flow со связью swUpdateController и SwUpdateBanner', () => {
		hookMocks.updateAvailable = false;

		renderScreen();

		const section = screen.getByRole('region', { name: 'Обновление Service Worker' });

		expect(within(section).getAllByText(/swUpdateController/i).length).toBeGreaterThanOrEqual(1);
		expect(within(section).getByText('SwUpdateBanner', { selector: 'code' })).toBeInTheDocument();
		expect(within(section).getByRole('status', { name: 'Актуальная версия' })).toBeInTheDocument();
	});

	it('должен показать «Доступно обновление» при updateAvailable', () => {
		hookMocks.updateAvailable = true;

		renderScreen();

		const section = screen.getByRole('region', { name: 'Обновление Service Worker' });

		expect(within(section).getByRole('status', { name: 'Доступно обновление' })).toBeInTheDocument();
	});

	it('должен показать кнопку сброса с предупреждением «только для лаборатории»', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Сброс для лаборатории' });

		expect(within(section).getByRole('button', { name: 'Сбросить SW и кэш' })).toBeInTheDocument();
		expect(within(section).getByText(/только для лаборатории/i)).toBeInTheDocument();
		expect(within(section).getByText(/update flow/i)).toBeInTheDocument();
	});

	it('должен показать перекрёстную ссылку на раздел Offline', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Дальше: кэширование' });

		expect(within(section).getByRole('link', { name: 'Офлайн и кэш' })).toHaveAttribute('href', '/offline');
		expect(within(section).getByText(/runtime rules/i)).toBeInTheDocument();
	});
});
