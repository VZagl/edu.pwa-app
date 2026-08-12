import { useCallback, useEffect, useState } from 'react';
import { applySwUpdate, subscribeSwUpdate } from '../pwa/swUpdateController.ts';

export function useSwUpdate() {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [isApplying, setIsApplying] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

	useEffect(() => {
		return subscribeSwUpdate(
			({
				updateAvailable: available,
				isApplying: applying,
				isDownloading: downloading,
				downloadProgress: progress,
			}) => {
				setUpdateAvailable(available);
				setIsApplying(applying);
				setIsDownloading(downloading);
				setDownloadProgress(progress);
			},
		);
	}, []);

	const applyUpdate = useCallback(() => {
		applySwUpdate();
	}, []);

	return { updateAvailable, isApplying, isDownloading, downloadProgress, applyUpdate };
}
