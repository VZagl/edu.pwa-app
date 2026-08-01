import { render, screen } from '@testing-library/react';
import { Link, MemoryRouter, NavLink, Route, Routes } from 'react-router';

function RouterPoc() {
	return (
		<>
			<nav aria-label='POC навигация'>
				<NavLink to='/'>Главная</NavLink>
				<Link to='/about'>О проекте</Link>
			</nav>
			<Routes>
				<Route path='/' element={<p>POC маршрут</p>} />
				<Route path='/about' element={<p>О проекте</p>} />
			</Routes>
		</>
	);
}

describe('React Router POC', () => {
	it('должен рендерить маршрут через MemoryRouter', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<RouterPoc />
			</MemoryRouter>,
		);

		expect(screen.getByText('POC маршрут')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Главная' })).toBeInTheDocument();
	});
});
