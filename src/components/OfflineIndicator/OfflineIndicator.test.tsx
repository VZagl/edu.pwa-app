import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	isOnline: true,
}));

vi.mock('../../hooks/useOnlineStatus/useOnlineStatus.ts', () => ({
	useOnlineStatus: () => hookMocks.isOnline,
}));

import { OfflineIndicator } from './OfflineIndicator.tsx';

describe('OfflineIndicator', () => {
	it('не должен рендериться при online', () => {
		hookMocks.isOnline = true;

		render(<OfflineIndicator />);

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('должен быть виден при offline', () => {
		hookMocks.isOnline = false;

		render(<OfflineIndicator />);

		expect(screen.getByRole('status')).toBeInTheDocument();
	});

	it('должен показать текст offline', () => {
		hookMocks.isOnline = false;

		render(<OfflineIndicator />);

		expect(screen.getByText('offline')).toBeInTheDocument();
	});

	it('должен иметь aria-label «Нет сети»', () => {
		hookMocks.isOnline = false;

		render(<OfflineIndicator />);

		expect(screen.getByRole('status', { name: 'Нет сети' })).toBeInTheDocument();
	});
});
