import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('virtual:pwa-register', () => ({
	registerSW: vi.fn(() => vi.fn().mockResolvedValue(undefined)),
}));
