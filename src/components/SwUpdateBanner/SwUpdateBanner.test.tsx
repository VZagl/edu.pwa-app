import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	updateAvailable: false,
	isApplying: false,
	applyUpdate: vi.fn(),
}));

vi.mock('../../hooks/useSwUpdate.ts', () => ({
	useSwUpdate: () => ({
		updateAvailable: hookMocks.updateAvailable,
		isApplying: hookMocks.isApplying,
		applyUpdate: hookMocks.applyUpdate,
	}),
}));

import { SwUpdateBanner } from './SwUpdateBanner.tsx';

describe('SwUpdateBanner', () => {
	it('не должен рендериться, если обновление недоступно', () => {
		hookMocks.updateAvailable = false;
		hookMocks.isApplying = false;

		render(<SwUpdateBanner />);

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('должен показать баннер с текстом и кнопкой «Обновить»', () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = false;

		render(<SwUpdateBanner />);

		expect(screen.getByRole('status')).toHaveTextContent('Доступно обновление');
		expect(screen.getByRole('button', { name: 'Обновить приложение' })).toHaveTextContent('Обновить');
		expect(screen.getByRole('button', { name: 'Обновить приложение' })).toBeEnabled();
	});

	it('должен вызвать applyUpdate при клике на кнопку', async () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = false;
		hookMocks.applyUpdate.mockClear();
		const user = userEvent.setup();

		render(<SwUpdateBanner />);
		await user.click(screen.getByRole('button', { name: 'Обновить приложение' }));

		expect(hookMocks.applyUpdate).toHaveBeenCalledOnce();
	});

	it('должен показать disabled-кнопку «Обновляется…» при isApplying', () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = true;

		render(<SwUpdateBanner />);

		const button = screen.getByRole('button', { name: 'Приложение обновляется' });
		expect(button).toHaveTextContent('Обновляется…');
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-busy', 'true');
	});

	it('не должен вызывать applyUpdate при клике, если кнопка disabled', async () => {
		hookMocks.updateAvailable = true;
		hookMocks.isApplying = true;
		hookMocks.applyUpdate.mockClear();
		const user = userEvent.setup();

		render(<SwUpdateBanner />);
		await user.click(screen.getByRole('button', { name: 'Приложение обновляется' }));

		expect(hookMocks.applyUpdate).not.toHaveBeenCalled();
	});
});
