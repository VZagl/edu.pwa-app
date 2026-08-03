import { render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ManifestScreen } from './ManifestScreen';
import { fetchManifest } from './fetchManifest';
import type { WebAppManifest } from './types';

vi.mock('./fetchManifest');

const mockManifest: WebAppManifest = {
	name: 'edu.pwa-app — учебное PWA',
	short_name: 'PWA Lab',
	description: 'Изучение Progressive Web Apps на React и Vite',
	start_url: '/',
	scope: '/',
	display: 'standalone',
	background_color: '#ffffff',
	theme_color: '#646cff',
	lang: 'ru',
	icons: [
		{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
		{ src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
	],
};

describe('ManifestScreen', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('должен отрендерить заголовок и объяснительный текст', async () => {
		vi.mocked(fetchManifest).mockResolvedValue(mockManifest);

		render(<ManifestScreen />);

		expect(screen.getByRole('heading', { level: 2, name: 'Web App Manifest' })).toBeInTheDocument();
		expect(screen.getByText(/Web App Manifest — это JSON-файл/i)).toBeInTheDocument();
		expect(screen.getByText(/браузер использует manifest/i)).toBeInTheDocument();
		expect(screen.getByText(/установка PWA/i)).toBeInTheDocument();

		expect(await screen.findByText('PWA Lab')).toBeInTheDocument();
	});

	it('должен показать состояние загрузки', () => {
		vi.mocked(fetchManifest).mockReturnValue(new Promise(() => {}));

		render(<ManifestScreen />);

		expect(screen.getByText('Загрузка данных манифеста…')).toBeInTheDocument();
	});

	it('должен показать значения полей манифеста после загрузки', async () => {
		vi.mocked(fetchManifest).mockResolvedValue(mockManifest);

		render(<ManifestScreen />);

		const section = await screen.findByRole('region', { name: 'Текущие значения manifest' });

		expect(within(section).getByText('edu.pwa-app — учебное PWA')).toBeInTheDocument();
		expect(within(section).getByText('PWA Lab')).toBeInTheDocument();
		expect(within(section).getByText('start_url', { selector: 'dt' })).toBeInTheDocument();
		expect(within(section).getByText('standalone')).toBeInTheDocument();
		expect(within(section).getByText('#646cff')).toBeInTheDocument();
		expect(within(section).getByText('#ffffff')).toBeInTheDocument();
		expect(within(section).getByText('Изучение Progressive Web Apps на React и Vite')).toBeInTheDocument();
		expect(within(section).getByText('ru')).toBeInTheDocument();
		expect(within(section).getByText(/\/icons\/icon-192\.png/)).toBeInTheDocument();
		expect(within(section).getByText(/192x192/)).toBeInTheDocument();
	});

	it('должен показать ошибку при неудачной загрузке', async () => {
		vi.mocked(fetchManifest).mockRejectedValue(new Error('Network error'));

		render(<ManifestScreen />);

		await waitFor(() => {
			expect(screen.getByText('Не удалось загрузить манифест')).toBeInTheDocument();
		});
	});
});
