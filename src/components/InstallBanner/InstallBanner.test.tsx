import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { InstallBanner } from './InstallBanner';

const hookMocks = vi.hoisted(() => ({
	canInstall: false,
	showFallback: false,
	fallbackHint: 'Тестовая подсказка',
	isInstalled: false,
	promptInstall: vi.fn(),
}));

vi.mock('../../hooks/useInstallPrompt/useInstallPrompt.ts', () => ({
	useInstallPrompt: () => ({
		canInstall: hookMocks.canInstall,
		showFallback: hookMocks.showFallback,
		fallbackHint: hookMocks.fallbackHint,
		isInstalled: hookMocks.isInstalled,
		promptInstall: hookMocks.promptInstall,
	}),
}));
describe('InstallBanner', () => {
	it('не должен рендериться, если приложение уже установлено', () => {
		hookMocks.isInstalled = true;
		hookMocks.canInstall = false;
		hookMocks.showFallback = false;

		render(<InstallBanner />);

		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('должен показать кнопку «Установить» при canInstall', () => {
		hookMocks.isInstalled = false;
		hookMocks.canInstall = true;
		hookMocks.showFallback = false;

		render(<InstallBanner />);

		expect(screen.getByRole('status')).toHaveTextContent('Установите приложение на устройство');
		expect(screen.getByRole('button', { name: 'Установить приложение' })).toHaveTextContent('Установить');
	});

	it('должен показать контекстный fallback-текст при showFallback', () => {
		hookMocks.isInstalled = false;
		hookMocks.canInstall = false;
		hookMocks.showFallback = true;
		hookMocks.fallbackHint = 'Нажмите «Поделиться» → «На экран Домой»';

		render(<InstallBanner />);

		expect(screen.getByRole('status')).toHaveTextContent('Нажмите «Поделиться» → «На экран Домой»');
		expect(screen.queryByRole('button', { name: 'Установить приложение' })).not.toBeInTheDocument();
	});

	it('должен вызвать promptInstall при клике на кнопку', async () => {
		hookMocks.isInstalled = false;
		hookMocks.canInstall = true;
		hookMocks.showFallback = false;
		hookMocks.promptInstall.mockClear();
		const user = userEvent.setup();

		render(<InstallBanner />);
		await user.click(screen.getByRole('button', { name: 'Установить приложение' }));

		expect(hookMocks.promptInstall).toHaveBeenCalledOnce();
	});
});
