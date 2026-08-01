import { render, screen } from '@testing-library/react';
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

	it('должен отрендерить навигацию с пунктом «Главная»', () => {
		renderApp();

		expect(screen.getByRole('navigation')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Главная' })).toBeInTheDocument();
	});

	it('должен отрендерить main с контентом маршрута', () => {
		renderApp();

		const main = screen.getByRole('main');
		expect(main).toBeInTheDocument();
		expect(screen.getByText('Добро пожаловать')).toBeInTheDocument();
		expect(screen.getByText('Контент уроков будет здесь')).toBeInTheDocument();
	});
});
