import { NavLink, Route, Routes } from 'react-router';
import './App.scss';

function HomePage() {
	return (
		<>
			<h2>Добро пожаловать</h2>
			<p>Контент уроков будет здесь</p>
		</>
	);
}

function NotFoundPage() {
	return <p>Страница не найдена</p>;
}

export function App() {
	return (
		<div className='app-shell'>
			<header className='app-shell__header'>
				<h1 className='app-shell__title'>edu.pwa-app</h1>
			</header>
			<nav className='app-shell__nav'>
				<ul className='app-shell__nav-list'>
					<li>
						<NavLink
							to='/'
							className={({ isActive }) =>
								`app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`
							}
							end
						>
							Главная
						</NavLink>
					</li>
				</ul>
			</nav>
			<main className='app-shell__main'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	);
}
