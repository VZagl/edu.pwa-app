import { describe, expect, it } from 'vitest';
import { getInstallFallbackHint } from './installFallbackHints.ts';

describe('getInstallFallbackHint', () => {
	it('должен вернуть подсказку для iOS (iPhone)', () => {
		const ua =
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

		expect(getInstallFallbackHint(ua)).toBe('Нажмите «Поделиться» → «На экран Домой»');
	});

	it('должен вернуть подсказку для iOS (iPad)', () => {
		const ua =
			'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

		expect(getInstallFallbackHint(ua)).toBe('Нажмите «Поделиться» → «На экран Домой»');
	});

	it('должен вернуть подсказку для Android non-Chromium (Firefox)', () => {
		const ua = 'Mozilla/5.0 (Android 14; Mobile; rv:128.0) Gecko/128.0 Firefox/128.0';

		expect(getInstallFallbackHint(ua)).toBe(
			'Откройте меню браузера (⋮) → «Установить приложение» или «Добавить на главный экран»',
		);
	});

	it('должен вернуть подсказку для desktop Firefox', () => {
		const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0';

		expect(getInstallFallbackHint(ua)).toBe(
			'Нажмите значок установки в адресной строке или Меню → «Установить»',
		);
	});

	it('должен вернуть подсказку для Safari macOS', () => {
		const ua =
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

		expect(getInstallFallbackHint(ua)).toBe('В меню «Файл» выберите «Добавить в Dock»');
	});

	it('должен вернуть generic-подсказку для неизвестного браузера', () => {
		const ua = 'Mozilla/5.0 (compatible; CustomBrowser/1.0)';

		expect(getInstallFallbackHint(ua)).toBe(
			'Установите через меню браузера: «Установить приложение» или «Добавить на главный экран»',
		);
	});
});
