import { useCallback, useEffect, useRef, useState } from 'react';
import { getInstallFallbackHint } from './installFallbackHints.ts';

const GRACE_PERIOD_MS = 1000;

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export type InstallPromptState = {
	canInstall: boolean;
	showFallback: boolean;
	fallbackHint: string;
	isInstalled: boolean;
	promptInstall: () => Promise<void>;
};

function detectIsInstalled(): boolean {
	const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
	const isIosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true;

	return isStandaloneDisplay || isIosStandalone;
}

export function useInstallPrompt(): InstallPromptState {
	const [canInstall, setCanInstall] = useState(false);
	const [showFallback, setShowFallback] = useState(false);
	const [isInstalled, setIsInstalled] = useState(detectIsInstalled);
	const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
	const fallbackHint = getInstallFallbackHint();

	useEffect(() => {
		if (isInstalled) {
			return;
		}

		const handleBeforeInstallPrompt = (event: Event) => {
			event.preventDefault();
			deferredPromptRef.current = event as BeforeInstallPromptEvent;
			setCanInstall(true);
			setShowFallback(false);
		};

		const handleAppInstalled = () => {
			deferredPromptRef.current = null;
			setCanInstall(false);
			setShowFallback(false);
			setIsInstalled(true);
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		window.addEventListener('appinstalled', handleAppInstalled);

		const graceTimer = window.setTimeout(() => {
			setShowFallback((currentFallback) => {
				if (deferredPromptRef.current) {
					return false;
				}

				return !detectIsInstalled() ? true : currentFallback;
			});
		}, GRACE_PERIOD_MS);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
			window.removeEventListener('appinstalled', handleAppInstalled);
			window.clearTimeout(graceTimer);
		};
	}, [isInstalled]);

	const promptInstall = useCallback(async () => {
		const deferredPrompt = deferredPromptRef.current;
		if (!deferredPrompt) {
			return;
		}

		await deferredPrompt.prompt();
		await deferredPrompt.userChoice;
		deferredPromptRef.current = null;
		setCanInstall(false);
	}, []);

	return {
		canInstall,
		showFallback,
		fallbackHint,
		isInstalled,
		promptInstall,
	};
}
