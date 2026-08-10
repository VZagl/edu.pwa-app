import { useEffect, useState } from 'react';

export type ServiceWorkerInfoState = {
	supported: boolean;
	loading: boolean;
	scope: string | null;
	activeState: string | null;
	waitingState: string | null;
	installingState: string | null;
	hasController: boolean;
	controllerScriptUrl: string | null;
};

const unsupportedState: ServiceWorkerInfoState = {
	supported: false,
	loading: false,
	scope: null,
	activeState: null,
	waitingState: null,
	installingState: null,
	hasController: false,
	controllerScriptUrl: null,
};

export async function readServiceWorkerInfo(): Promise<ServiceWorkerInfoState> {
	if (!('serviceWorker' in navigator)) {
		return unsupportedState;
	}

	const controller = navigator.serviceWorker.controller;
	const registration = await navigator.serviceWorker.getRegistration();

	return {
		supported: true,
		loading: false,
		scope: registration?.scope ?? null,
		activeState: registration?.active?.state ?? null,
		waitingState: registration?.waiting?.state ?? null,
		installingState: registration?.installing?.state ?? null,
		hasController: controller !== null,
		controllerScriptUrl: registration?.active?.scriptURL ?? controller?.scriptURL ?? null,
	};
}

export function useServiceWorkerInfo(): ServiceWorkerInfoState {
	const isSupported = 'serviceWorker' in navigator;
	const [info, setInfo] = useState<ServiceWorkerInfoState>(() =>
		isSupported ? { ...unsupportedState, supported: true, loading: true } : unsupportedState,
	);

	useEffect(() => {
		if (!isSupported) {
			return;
		}

		let cancelled = false;

		const refresh = async () => {
			const next = await readServiceWorkerInfo();
			if (!cancelled) {
				setInfo(next);
			}
		};

		void refresh();

		const handleControllerChange = () => {
			void refresh();
		};

		navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

		return () => {
			cancelled = true;
			navigator.serviceWorker?.removeEventListener('controllerchange', handleControllerChange);
		};
	}, [isSupported]);

	return info;
}
