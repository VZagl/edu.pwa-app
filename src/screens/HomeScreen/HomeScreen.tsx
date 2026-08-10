import { Link } from 'react-router';
import { lessonRoutes } from '../../routes/lessonRoutes';
import { homeIntro, howToItems, httpsWhyItems, pwaChecklistItems } from './homeLessonData';
import './HomeScreen.scss';

function ModulesSection() {
	const moduleRoutes = lessonRoutes.filter((route) => route.path !== '/');

	return (
		<section className='home-screen__section' role='region' aria-labelledby='home-modules-heading'>
			<h3 id='home-modules-heading'>Модули</h3>
			<ol className='home-screen__modules'>
				{moduleRoutes.map((route) => (
					<li key={route.path}>
						<Link to={route.path}>{route.navLabel}</Link>
					</li>
				))}
			</ol>
		</section>
	);
}

function ChecklistSection() {
	return (
		<section className='home-screen__section' role='region' aria-labelledby='home-checklist-heading'>
			<h3 id='home-checklist-heading'>Чеклист PWA</h3>
			<ul className='home-screen__list'>
				{pwaChecklistItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</section>
	);
}

function HowToSection() {
	return (
		<section className='home-screen__section' role='region' aria-labelledby='home-howto-heading'>
			<h3 id='home-howto-heading'>Как пользоваться</h3>
			<ul className='home-screen__list'>
				{howToItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</section>
	);
}

function HttpsSection() {
	return (
		<section className='home-screen__section' role='region' aria-labelledby='home-https-heading'>
			<h3 id='home-https-heading'>Почему HTTPS</h3>
			<ul className='home-screen__list'>
				{httpsWhyItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</section>
	);
}

export function HomeScreen() {
	return (
		<div className='home-screen'>
			<h2>Карта лаборатории</h2>

			<div className='home-screen__intro'>
				{homeIntro.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<ModulesSection />
			<ChecklistSection />
			<HowToSection />
			<HttpsSection />
		</div>
	);
}
