import { Link } from 'react-router';
import { useServiceWorkerInfo } from '../../hooks/useServiceWorkerInfo/useServiceWorkerInfo.ts';
import { useSwUpdate } from '../../hooks/useSwUpdate.ts';
import { resetServiceWorkerLab } from '../../pwa/resetServiceWorkerLab.ts';
import './ServiceWorkerScreen.scss';
import {
	devModeHint,
	lifecycleSteps,
	offlineLinkText,
	resetLabWarning,
	swIntro,
	updateFlowDescription,
} from './swLessonData';

function LifecycleSection() {
	return (
		<section className='sw-screen__section' role='region' aria-labelledby='sw-lifecycle-heading'>
			<h3 id='sw-lifecycle-heading'>Жизненный цикл</h3>
			<ol className='sw-screen__lifecycle'>
				{lifecycleSteps.map((step) => (
					<li key={step.phase}>
						<span className='sw-screen__phase'>{step.phase}</span>
						{step.description}
					</li>
				))}
			</ol>
		</section>
	);
}

function SwDemoSection() {
	const info = useServiceWorkerInfo();
	const isDev = import.meta.env.DEV;

	let statusLabel: string;
	let badgeClass: string;

	if (!info.supported) {
		statusLabel = 'Не поддерживается';
		badgeClass = 'sw-screen__badge--unsupported';
	} else if (info.loading) {
		statusLabel = 'Загрузка…';
		badgeClass = 'sw-screen__badge--inactive';
	} else if (info.hasController) {
		statusLabel = 'Контролирует страницу';
		badgeClass = 'sw-screen__badge--active';
	} else {
		statusLabel = 'Нет контроллера';
		badgeClass = 'sw-screen__badge--waiting';
	}

	return (
		<section className='sw-screen__section' role='region' aria-labelledby='sw-demo-heading'>
			<h3 id='sw-demo-heading'>Демо: статус SW</h3>

			<p>
				Живые данные из <code>navigator.serviceWorker</code> и <code>getRegistration()</code>. Обновляются при{' '}
				<code>controllerchange</code>.
			</p>

			{isDev && <p className='sw-screen__hint'>{devModeHint}</p>}

			<div className={`sw-screen__badge ${badgeClass}`} role='status' aria-label={statusLabel}>
				{statusLabel}
			</div>

			<dl className='sw-screen__fields'>
				<dt>scope</dt>
				<dd>{info.scope ?? '—'}</dd>

				<dt>active.state</dt>
				<dd>{info.activeState ?? '—'}</dd>

				<dt>waiting.state</dt>
				<dd>{info.waitingState ?? '—'}</dd>

				<dt>installing.state</dt>
				<dd>{info.installingState ?? '—'}</dd>

				<dt>controller</dt>
				<dd>{info.hasController ? 'есть' : 'нет'}</dd>

				<dt>revision (scriptURL)</dt>
				<dd>
					<code>{info.controllerScriptUrl ?? '—'}</code>
				</dd>
			</dl>
		</section>
	);
}

function UpdateFlowSection() {
	const { updateAvailable } = useSwUpdate();

	return (
		<section className='sw-screen__section' role='region' aria-labelledby='sw-update-heading'>
			<h3 id='sw-update-heading'>Обновление Service Worker</h3>

			<p>{updateFlowDescription}</p>

			<p>
				Глобальный баннер <code>SwUpdateBanner</code> в шапке приложения использует тот же{' '}
				<code>swUpdateController</code> через хук <code>useSwUpdate</code>.
			</p>

			<div
				className={`sw-screen__badge ${updateAvailable ? 'sw-screen__badge--waiting' : 'sw-screen__badge--active'}`}
				role='status'
				aria-label={updateAvailable ? 'Доступно обновление' : 'Актуальная версия'}
			>
				{updateAvailable ? 'Доступно обновление' : 'Актуальная версия'}
			</div>
		</section>
	);
}

function ResetLabSection() {
	return (
		<section className='sw-screen__section' role='region' aria-labelledby='sw-reset-heading'>
			<h3 id='sw-reset-heading'>Сброс для лаборатории</h3>

			<p className='sw-screen__warning'>{resetLabWarning}</p>

			<button
				type='button'
				className='sw-screen__reset-button'
				aria-label='Сбросить SW и кэш'
				onClick={() => void resetServiceWorkerLab()}
			>
				Сбросить SW и кэш
			</button>
		</section>
	);
}

function OfflineLinkSection() {
	return (
		<section className='sw-screen__section' role='region' aria-labelledby='sw-offline-link-heading'>
			<h3 id='sw-offline-link-heading'>Дальше: кэширование</h3>

			<p>
				{offlineLinkText}{' '}
				<Link className='sw-screen__link' to='/offline'>
					Офлайн и кэш
				</Link>
			</p>
		</section>
	);
}

export function ServiceWorkerScreen() {
	return (
		<div className='sw-screen'>
			<h2>Service Worker</h2>

			<div className='sw-screen__intro'>
				{swIntro.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<section className='sw-screen__section' role='region' aria-labelledby='sw-intro-heading'>
				<h3 id='sw-intro-heading'>Введение</h3>
				<p>
					Service Worker работает в отдельном потоке и не имеет доступа к DOM. Scope определяет, какие URL он
					может перехватывать — у этой лаборатории scope равен <code>/</code>.
				</p>
			</section>

			<LifecycleSection />
			<SwDemoSection />
			<UpdateFlowSection />
			<ResetLabSection />
			<OfflineLinkSection />
		</div>
	);
}
