import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	updateAvailable: false,
	applyUpdate: vi.fn(),
}));

vi.mock('../../hooks/useSwUpdate.ts', () => ({
	useSwUpdate: () => ({
		updateAvailable: hookMocks.updateAvailable,
		applyUpdate: hookMocks.applyUpdate,
	}),
}));

import { SwUpdateBanner } from './SwUpdateBanner.tsx';

describe('SwUpdateBanner', () => {
	it('не должен рендериться, если обновление недоступно', () => {
		hookMocks.updateAvailable = false;

		render(<SwUpdateBanner />);

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('должен показать баннер с текстом и кнопкой «Обновить»', () => {
		hookMocks.updateAvailable = true;

		render(<SwUpdateBanner />);

		expect(screen.getByRole('status')).toHaveTextContent('Доступно обновление');
		expect(screen.getByRole('button', { name: 'Обновить приложение' })).toHaveTextContent('Обновить');
	});

	it('должен вызвать applyUpdate при клике на кнопку', async () => {
		hookMocks.updateAvailable = true;
		hookMocks.applyUpdate.mockClear();
		const user = userEvent.setup();

		render(<SwUpdateBanner />);
		await user.click(screen.getByRole('button', { name: 'Обновить приложение' }));

		expect(hookMocks.applyUpdate).toHaveBeenCalledOnce();
	});
});
