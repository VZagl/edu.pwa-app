import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomeScreen } from './HomeScreen';

function renderHomeScreen() {
	return render(
		<MemoryRouter>
			<HomeScreen />
		</MemoryRouter>,
	);
}

describe('HomeScreen', () => {
	it('должен отрендерить заголовок и вводный текст о учебном PWA', () => {
		renderHomeScreen();

		expect(screen.getByRole('heading', { level: 2, name: 'Карта лаборатории' })).toBeInTheDocument();
		expect(screen.getByText(/учебн(ое|ого) PWA/i)).toBeInTheDocument();
		expect(screen.getByText(/Пройдите модули по порядку/i)).toBeInTheDocument();
	});

	it('должен показать секцию модулей со ссылками на учебные разделы', () => {
		renderHomeScreen();

		const section = screen.getByRole('region', { name: 'Модули' });

		expect(within(section).getByRole('link', { name: 'Manifest' })).toHaveAttribute('href', '/manifest');
		expect(within(section).getByRole('link', { name: 'Service Worker' })).toHaveAttribute(
			'href',
			'/service-worker',
		);
		expect(within(section).getByRole('link', { name: 'Offline' })).toHaveAttribute('href', '/offline');
		expect(within(section).getByRole('link', { name: 'Install' })).toHaveAttribute('href', '/install');
		expect(within(section).getByRole('link', { name: 'Cache Storage' })).toHaveAttribute(
			'href',
			'/cache-storage',
		);
		expect(within(section).queryByRole('link', { name: 'Главная' })).not.toBeInTheDocument();
	});

	it('должен показать краткий чеклист критериев PWA', () => {
		renderHomeScreen();

		const section = screen.getByRole('region', { name: 'Чеклист PWA' });
		const items = within(section).getAllByRole('listitem');

		expect(items.length).toBeGreaterThanOrEqual(4);
		expect(items.length).toBeLessThanOrEqual(6);
		expect(within(section).getByText(/Web App Manifest/i)).toBeInTheDocument();
		expect(within(section).getByText(/Service Worker зарегистрирован/i)).toBeInTheDocument();
		expect(within(section).getByText(/Офлайн:/i)).toBeInTheDocument();
		expect(within(section).getByText(/installable/i)).toBeInTheDocument();
	});

	it('должен показать блок «Как пользоваться» с preview и DevTools', () => {
		renderHomeScreen();

		const section = screen.getByRole('region', { name: 'Как пользоваться' });

		expect(within(section).getByText(/pnpm build/i)).toBeInTheDocument();
		expect(within(section).getByText(/pnpm preview/i)).toBeInTheDocument();
		expect(within(section).getByText(/DevTools/i)).toBeInTheDocument();
	});

	it('должен показать блок «Почему HTTPS» про secure context и localhost', () => {
		renderHomeScreen();

		const section = screen.getByRole('region', { name: 'Почему HTTPS' });

		expect(within(section).getByText(/secure context/i)).toBeInTheDocument();
		expect(within(section).getByText(/localhost/i)).toBeInTheDocument();
		expect(within(section).getByText(/GitHub Pages/i)).toBeInTheDocument();
	});
});
