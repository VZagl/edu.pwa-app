const FALLBACK_HINTS = {
	ios: 'Нажмите «Поделиться» → «На экран Домой»',
	androidNonChromium: 'Откройте меню браузера (⋮) → «Установить приложение» или «Добавить на главный экран»',
	desktopFirefox: 'Нажмите значок установки в адресной строке или Меню → «Установить»',
	desktopSafari: 'В меню «Файл» выберите «Добавить в Dock»',
	generic: 'Установите через меню браузера: «Установить приложение» или «Добавить на главный экран»',
} as const;

function isIosUserAgent(userAgent: string): boolean {
	return /iPhone|iPad|iPod/i.test(userAgent);
}

function isAndroidUserAgent(userAgent: string): boolean {
	return /Android/i.test(userAgent);
}

function isChromiumUserAgent(userAgent: string): boolean {
	return /Chrome|CriOS|Edg|EdgA|OPR|SamsungBrowser/i.test(userAgent);
}

function isFirefoxUserAgent(userAgent: string): boolean {
	return /Firefox|FxiOS/i.test(userAgent);
}

function isDesktopSafariUserAgent(userAgent: string): boolean {
	return /Safari/i.test(userAgent) && !/Chrome|Chromium|CriOS|Android/i.test(userAgent);
}

/**
 * Возвращает контекстную текстовую подсказку для ручной установки PWA.
 * UA используется только для выбора текста, не для решения о доступности install API.
 */
export function getInstallFallbackHint(userAgent: string = navigator.userAgent): string {
	if (isIosUserAgent(userAgent)) {
		return FALLBACK_HINTS.ios;
	}

	if (isAndroidUserAgent(userAgent) && (!isChromiumUserAgent(userAgent) || isFirefoxUserAgent(userAgent))) {
		return FALLBACK_HINTS.androidNonChromium;
	}

	if (isFirefoxUserAgent(userAgent) && !isAndroidUserAgent(userAgent)) {
		return FALLBACK_HINTS.desktopFirefox;
	}

	if (isDesktopSafariUserAgent(userAgent)) {
		return FALLBACK_HINTS.desktopSafari;
	}

	return FALLBACK_HINTS.generic;
}
