import { NavLink, Route, Routes } from 'react-router';
import './App.scss';
import { lessonRoutes } from './routes/lessonRoutes';
import { NotFoundScreen } from './screens/NotFoundScreen/NotFoundScreen';

export function App() {
	return (
		<div className='app-shell'>
			<header className='app-shell__header'>
				<h1 className='app-shell__title'>edu.pwa-app</h1>
			</header>
			<nav className='app-shell__nav'>
				<ul className='app-shell__nav-list'>
					{lessonRoutes.map((route) => (
						<li key={route.path}>
							<NavLink
								to={route.path}
								className={({ isActive }) =>
									`app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`
								}
								end={route.path === '/'}
							>
								{route.navLabel}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<main className='app-shell__main'>
				<Routes>
					{lessonRoutes.map((route) => (
						<Route key={route.path} path={route.path} element={<route.Screen />} />
					))}
					<Route path='*' element={<NotFoundScreen />} />
				</Routes>
			</main>
		</div>
	);
}
