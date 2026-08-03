import type { WebAppManifest } from './types';

const MANIFEST_URL = '/manifest.webmanifest';

export async function fetchManifest(): Promise<WebAppManifest> {
	const response = await fetch(MANIFEST_URL);

	if (!response.ok) {
		throw new Error('Не удалось загрузить манифест');
	}

	return response.json() as Promise<WebAppManifest>;
}
