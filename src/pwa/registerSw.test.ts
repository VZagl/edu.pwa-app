import { afterEach, describe, expect, it, vi } from 'vitest';
import { registerSw } from './registerSw.ts';

describe('registerSw', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('должен зарегистрировать Service Worker при поддержке браузером', async () => {
		const register = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal('navigator', {
			serviceWorker: { register },
		});

		await registerSw();

		expect(register).toHaveBeenCalledWith('/sw.js');
	});

	it('не должен вызывать register, если Service Worker не поддерживается', async () => {
		vi.stubGlobal('navigator', {});

		await registerSw();

		expect(navigator).not.toHaveProperty('serviceWorker');
	});
});
