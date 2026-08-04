import { useCallback, useEffect, useState } from 'react';
import { applySwUpdate, subscribeSwUpdate } from '../pwa/swUpdateController.ts';

export function useSwUpdate() {
	const [updateAvailable, setUpdateAvailable] = useState(false);

	useEffect(() => {
		return subscribeSwUpdate(({ updateAvailable: available }) => {
			setUpdateAvailable(available);
		});
	}, []);

	const applyUpdate = useCallback(() => {
		applySwUpdate();
	}, []);

	return { updateAvailable, applyUpdate };
}
