import { useCallback, useEffect, useState } from 'react';
import { applySwUpdate, subscribeSwUpdate } from '../pwa/swUpdateController.ts';

export function useSwUpdate() {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [isApplying, setIsApplying] = useState(false);

	useEffect(() => {
		return subscribeSwUpdate(({ updateAvailable: available, isApplying: applying }) => {
			setUpdateAvailable(available);
			setIsApplying(applying);
		});
	}, []);

	const applyUpdate = useCallback(() => {
		applySwUpdate();
	}, []);

	return { updateAvailable, isApplying, applyUpdate };
}
