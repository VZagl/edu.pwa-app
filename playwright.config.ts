import { defineConfig, devices } from '@playwright/test';

// Vite `base: '/edu.pwa-app/'` — preview отдаёт приложение под subdirectory
const PREVIEW_ORIGIN = 'http://localhost:4173';
const APP_BASE = '/edu.pwa-app/';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: 'list',
	use: {
		baseURL: `${PREVIEW_ORIGIN}${APP_BASE}`,
		trace: 'on-first-retry',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'pnpm build && pnpm preview',
		url: `${PREVIEW_ORIGIN}${APP_BASE}`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
