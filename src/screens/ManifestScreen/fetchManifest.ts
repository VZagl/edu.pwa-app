import type { WebAppManifest } from './types';

/** BASE_URL учитывает Vite `base` (например `/edu.pwa-app/` на GitHub Pages). */
const MANIFEST_URL = `${import.meta.env.BASE_URL}manifest.webmanifest`;

export async function fetchManifest(): Promise<WebAppManifest> {
	const response = await fetch(MANIFEST_URL);

	if (!response.ok) {
		throw new Error('Не удалось загрузить манифест');
	}

	return response.json() as Promise<WebAppManifest>;
}
