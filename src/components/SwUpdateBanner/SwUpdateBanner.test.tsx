import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	updateAvailable: false,
	isApplying: false,
	isDownloading: false,
	downloadProgress: null as number | null,
	applyUpdate: vi.fn(),
}));

vi.mock('../../hooks/useSwUpdate.ts', () => ({
	useSwUpdate: () => ({
		updateAvailable: hookMocks.updateAvailable,
		isApplying: hookMocks.isApplying,
		isDownloading: hookMocks.isDownloading,
		downloadProgress: hookMocks.downloadProgress,
		applyUpdate: hookMocks.applyUpdate,
	}),
}));

import { SwUpdateBanner } from './SwUpdateBanner.tsx';

describe('SwUpdateBanner', () => {
	it('не должен рендериться, если обновление недоступно и нет загрузки', () => {
		hookMocks.updateAvailable = false;
		hookMocks.isApplying = false;
		hookMocks.isDownloading = false;

		render(<SwUpdateBanner />);

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('должен показать индикатор загрузки при isDownloading', () => {
		hookMocks.updateAvailable = false;
		hookMocks.isApplying = false;
		hookMocks.isDownloading = true;
		hookMocks.downloadProgress = null;

		render(<SwUpdateBanner />);

		expect(screen.getByRole('status')).toHaveTextContent('Загружается обновление…');
		expect(screen.getByRole('progressbar', { name: 'Загрузка обновления' })).toBeInTheDocument();
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('должен приоритетно показать загрузку, даже если updateAvailable true', () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = false;
		hookMocks.isDownloading = true;

		render(<SwUpdateBanner />);

		expect(screen.getByRole('status')).toHaveTextContent('Загружается обновление…');
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('должен показать баннер с текстом и кнопкой «Обновить»', () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = false;
		hookMocks.isDownloading = false;

		render(<SwUpdateBanner />);

		expect(screen.getByRole('status')).toHaveTextContent('Доступно обновление');
		expect(screen.getByRole('button', { name: 'Обновить приложение' })).toHaveTextContent('Обновить');
		expect(screen.getByRole('button', { name: 'Обновить приложение' })).toBeEnabled();
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	});

	it('должен вызвать applyUpdate при клике на кнопку', async () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = false;
		hookMocks.isDownloading = false;
		hookMocks.applyUpdate.mockClear();
		const user = userEvent.setup();

		render(<SwUpdateBanner />);
		await user.click(screen.getByRole('button', { name: 'Обновить приложение' }));

		expect(hookMocks.applyUpdate).toHaveBeenCalledOnce();
	});

	it('должен показать disabled-кнопку «Обновляется…» при isApplying', () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = true;
		hookMocks.isDownloading = false;

		render(<SwUpdateBanner />);

		const button = screen.getByRole('button', { name: 'Приложение обновляется' });
		expect(button).toHaveTextContent('Обновляется…');
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-busy', 'true');
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	});

	it('не должен вызывать applyUpdate при клике, если кнопка disabled', async () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = true;
		hookMocks.isDownloading = false;
		hookMocks.applyUpdate.mockClear();
		const user = userEvent.setup();

		render(<SwUpdateBanner />);
		await user.click(screen.getByRole('button', { name: 'Приложение обновляется' }));

		expect(hookMocks.applyUpdate).not.toHaveBeenCalled();
	});
});
