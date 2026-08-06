import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	isOnline: true,
}));

vi.mock('../../hooks/useOnlineStatus/useOnlineStatus.ts', () => ({
	useOnlineStatus: () => hookMocks.isOnline,
}));

import { OfflineScreen } from './OfflineScreen';

describe('OfflineScreen', () => {
	it('должен отрендерить заголовок и вводный текст о precache и runtime', () => {
		hookMocks.isOnline = true;

		render(<OfflineScreen />);

		expect(screen.getByRole('heading', { level: 2, name: 'Офлайн и кэш' })).toBeInTheDocument();
		expect(screen.getByText(/кэширование позволяет PWA/i)).toBeInTheDocument();
		expect(screen.getByText(/статические файлы сборки кэшируются при установке SW/i)).toBeInTheDocument();
		expect(screen.getByText(/правила для запросов во время работы приложения/i)).toBeInTheDocument();
		expect(screen.getByText(/Не путайте этот учебный раздел/i)).toBeInTheDocument();
	});

	it('должен показать секцию стратегий кэширования с данными Workbox', () => {
		hookMocks.isOnline = true;

		render(<OfflineScreen />);

		const section = screen.getByRole('region', { name: 'Стратегии кэширования' });

		expect(within(section).getByText('globPatterns', { selector: 'dt' })).toBeInTheDocument();
		expect(
			within(section).getByText(/\*\*\/\*\.\{js,css,html,ico,png,svg,webmanifest\}/),
		).toBeInTheDocument();
		expect(within(section).getByText('NetworkFirst')).toBeInTheDocument();
		expect(within(section).getByText('StaleWhileRevalidate')).toBeInTheDocument();
		expect(within(section).getByText('runtime-json')).toBeInTheDocument();
		expect(within(section).getByText('runtime-images')).toBeInTheDocument();
		expect(within(section).getByText('index.html')).toBeInTheDocument();
	});

	it('должен показать демо статуса сети — «В сети» при online', () => {
		hookMocks.isOnline = true;

		render(<OfflineScreen />);

		const section = screen.getByRole('region', { name: 'Демо: статус сети' });

		expect(within(section).getByRole('status', { name: 'В сети' })).toBeInTheDocument();
		expect(within(section).getByText(/DevTools/i)).toBeInTheDocument();
		expect(within(section).getByText(/OfflineIndicator/i)).toBeInTheDocument();
	});

	it('должен показать демо статуса сети — «Нет сети» при offline', () => {
		hookMocks.isOnline = false;

		render(<OfflineScreen />);

		const section = screen.getByRole('region', { name: 'Демо: статус сети' });

		expect(within(section).getByRole('status', { name: 'Нет сети' })).toBeInTheDocument();
	});
});
