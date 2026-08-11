import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const hookMocks = vi.hoisted(() => ({
	canInstall: false,
	showFallback: false,
	fallbackHint: 'Тестовая подсказка для ручной установки',
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

function mockDisplayMode(standalone: boolean, iosStandalone?: boolean) {
	Object.defineProperty(window, 'matchMedia', {
		configurable: true,
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: query === '(display-mode: standalone)' ? standalone : false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});

	Object.defineProperty(navigator, 'standalone', {
		configurable: true,
		writable: true,
		value: iosStandalone,
	});
}

import { InstallScreen } from './InstallScreen';

function renderScreen() {
	return render(<InstallScreen />);
}

describe('InstallScreen', () => {
	beforeEach(() => {
		hookMocks.canInstall = false;
		hookMocks.showFallback = false;
		hookMocks.fallbackHint = 'Тестовая подсказка для ручной установки';
		hookMocks.isInstalled = false;
		hookMocks.promptInstall = vi.fn();
		mockDisplayMode(false, undefined);
	});

	it('должен отрендерить заголовок и вводный текст об установке и InstallBanner', () => {
		renderScreen();

		expect(screen.getByRole('heading', { level: 2, name: 'Установка PWA' })).toBeInTheDocument();
		expect(screen.getByText(/иконки на домашнем экране/i)).toBeInTheDocument();
		expect(screen.getByText(/глобальный InstallBanner/i)).toBeInTheDocument();
	});

	it('должен показать секцию условий installability с HTTPS, manifest, SW и иконками', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Условия installability' });

		expect(within(section).getByText('Secure context (HTTPS / localhost)')).toBeInTheDocument();
		expect(within(section).getByText(/Валидный Web App Manifest/i)).toBeInTheDocument();
		expect(within(section).getByText(/Зарегистрированный Service Worker/i)).toBeInTheDocument();
		expect(within(section).getByText(/Иконки для установки/i)).toBeInTheDocument();
	});

	it('должен показать кнопку «Установить» при canInstall', async () => {
		hookMocks.canInstall = true;

		renderScreen();

		const section = screen.getByRole('region', { name: 'Демо: статус установки' });
		const button = within(section).getByRole('button', { name: 'Установить приложение' });

		expect(within(section).getByRole('status', { name: 'Можно установить' })).toBeInTheDocument();

		await userEvent.click(button);
		expect(hookMocks.promptInstall).toHaveBeenCalledOnce();
	});

	it('должен показать fallbackHint при showFallback', () => {
		hookMocks.showFallback = true;

		renderScreen();

		const section = screen.getByRole('region', { name: 'Демо: статус установки' });

		expect(within(section).getByRole('status', { name: 'Ручная установка' })).toBeInTheDocument();
		expect(within(section).getByText('Тестовая подсказка для ручной установки')).toBeInTheDocument();
	});

	it('должен показать badge «Установлено» при isInstalled', () => {
		hookMocks.isInstalled = true;

		renderScreen();

		const section = screen.getByRole('region', { name: 'Демо: статус установки' });

		expect(within(section).getByRole('status', { name: 'Установлено' })).toBeInTheDocument();
	});

	it('должен показать секцию display-mode со standalone и navigator.standalone', () => {
		mockDisplayMode(true, false);

		renderScreen();

		const section = screen.getByRole('region', { name: 'display-mode' });

		expect(within(section).getByRole('status', { name: 'standalone' })).toBeInTheDocument();
		expect(within(section).getByText(/обычной вкладке/i)).toBeInTheDocument();
		expect(within(section).getByText(/navigator\.standalone/i)).toBeInTheDocument();
	});

	it('должен показать инструкции по платформам Chromium, iOS и прочим', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Инструкции по платформам' });

		expect(within(section).getByText(/Chromium/i)).toBeInTheDocument();
		expect(within(section).getAllByText(/beforeinstallprompt/i).length).toBeGreaterThanOrEqual(1);
		expect(within(section).getByText(/iOS \/ Safari/i)).toBeInTheDocument();
		expect(within(section).getByText(/На экран Домой/i)).toBeInTheDocument();
		expect(within(section).getByText(/Firefox, прочие браузеры/i)).toBeInTheDocument();
	});

	it('должен показать секцию DevTools с Manifest и Lighthouse', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'DevTools' });

		expect(within(section).getByText(/Application → Manifest/i)).toBeInTheDocument();
		expect(within(section).getByText(/Lighthouse/i)).toBeInTheDocument();
		expect(within(section).getByText(/pnpm build/i)).toBeInTheDocument();
	});

	it('должен показать связь с InstallBanner и useInstallPrompt', () => {
		renderScreen();

		const section = screen.getByRole('region', { name: 'Связь с баннером' });

		expect(within(section).getByText('InstallBanner', { selector: 'code' })).toBeInTheDocument();
		expect(within(section).getByText('useInstallPrompt', { selector: 'code' })).toBeInTheDocument();
		expect(within(section).getByText(/fallbackHint/i)).toBeInTheDocument();
	});
});
