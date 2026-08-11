import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { App } from './App';

function renderApp(initialRoute = '/') {
	return render(
		<MemoryRouter initialEntries={[initialRoute]}>
			<App />
		</MemoryRouter>,
	);
}

describe('Оболочка приложения', () => {
	it('должен отрендерить header с названием проекта', () => {
		renderApp();

		expect(screen.getByRole('banner')).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 1, name: 'edu.pwa-app' })).toBeInTheDocument();
	});

	it('должен отрендерить навигацию с восемью пунктами', () => {
		renderApp();

		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
		expect(within(nav).getByRole('link', { name: 'Главная' })).toBeInTheDocument();
		expect(within(nav).getByRole('link', { name: 'Manifest' })).toBeInTheDocument();
		expect(within(nav).getByRole('link', { name: 'Service Worker' })).toBeInTheDocument();
		expect(within(nav).getByRole('link', { name: 'Offline' })).toBeInTheDocument();
		expect(within(nav).getByRole('link', { name: 'Install' })).toBeInTheDocument();
		expect(within(nav).getByRole('link', { name: 'Cache Storage' })).toBeInTheDocument();
		expect(within(nav).getByRole('link', { name: /^Storage$/ })).toBeInTheDocument();
		expect(within(nav).getByRole('link', { name: 'Push' })).toBeInTheDocument();
	});

	it('должен отрендерить main с контентом маршрута', () => {
		renderApp();

		const main = screen.getByRole('main');
		expect(main).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 2, name: 'Карта лаборатории' })).toBeInTheDocument();
	});

	it('должен показать контент раздела при клике по ссылке навигации', async () => {
		const user = userEvent.setup();
		renderApp();

		const nav = screen.getByRole('navigation');
		await user.click(within(nav).getByRole('link', { name: 'Manifest' }));

		expect(screen.getByRole('heading', { level: 2, name: 'Web App Manifest' })).toBeInTheDocument();
	});

	it('должен помечать активный пункт навигации aria-current="page"', () => {
		renderApp('/manifest');

		const nav = screen.getByRole('navigation');
		expect(within(nav).getByRole('link', { name: 'Manifest' })).toHaveAttribute('aria-current', 'page');
		expect(within(nav).getByRole('link', { name: 'Главная' })).not.toHaveAttribute('aria-current', 'page');
	});

	it('должен показать страницу 404 для неизвестного пути', () => {
		renderApp('/unknown');

		expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
	});
});
