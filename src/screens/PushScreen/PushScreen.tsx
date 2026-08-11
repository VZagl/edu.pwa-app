import { Link } from 'react-router';
import {
	usePushNotifications,
	type UsePushNotificationsResult,
} from '../../hooks/usePushNotifications/usePushNotifications.ts';
import './PushScreen.scss';
import {
	backendDuties,
	pushChainSteps,
	pushDevToolsItems,
	pushIntro,
	pushLimitsItems,
	pushPreviewHint,
} from './pushLessonData';

function shortenEndpoint(endpoint: string): string {
	if (endpoint.length <= 48) {
		return endpoint;
	}

	return `${endpoint.slice(0, 28)}…${endpoint.slice(-12)}`;
}

function resolveBadge(state: Pick<UsePushNotificationsResult, 'supported' | 'permission' | 'subscription'>): {
	statusLabel: string;
	badgeClass: string;
} {
	if (!state.supported) {
		return { statusLabel: 'Не поддерживается', badgeClass: 'push-screen__badge--unsupported' };
	}

	if (state.subscription) {
		return { statusLabel: 'Подписано', badgeClass: 'push-screen__badge--subscribed' };
	}

	if (state.permission === 'denied') {
		return { statusLabel: 'Запрещено', badgeClass: 'push-screen__badge--denied' };
	}

	if (state.permission === 'granted') {
		return { statusLabel: 'Разрешено', badgeClass: 'push-screen__badge--granted' };
	}

	return { statusLabel: 'Ожидание разрешения', badgeClass: 'push-screen__badge--default' };
}

function HowItWorksSection() {
	return (
		<section className='push-screen__section' role='region' aria-labelledby='push-how-heading'>
			<h3 id='push-how-heading'>Как работает</h3>

			<p>
				Цепочка Web Push: Permission → subscribe → push-сервис → (backend) → событие <code>push</code> в
				Service Worker. Локальный <code>showNotification</code> учит UI уведомлений, но это не доставка с
				сервера.
			</p>

			<ol className='push-screen__list'>
				{pushChainSteps.map((step) => (
					<li key={step.id}>
						<span className='push-screen__step-label'>{step.label}</span>
						{step.description}
					</li>
				))}
			</ol>
		</section>
	);
}

function PushDemoSection() {
	const {
		supported,
		permission,
		subscription,
		error,
		message,
		requestPermission,
		subscribe,
		unsubscribe,
		showLocalNotification,
	} = usePushNotifications();

	const { statusLabel, badgeClass } = resolveBadge({ supported, permission, subscription });
	const canRequest = supported && permission === 'default';
	const canSubscribe = supported && permission === 'granted' && !subscription;
	const canUnsubscribe = Boolean(subscription);
	const canLocalNotify = supported && permission === 'granted';

	return (
		<section className='push-screen__section' role='region' aria-labelledby='push-demo-heading'>
			<h3 id='push-demo-heading'>Демо: уведомления и подписка</h3>

			<p>
				Живые статусы из хука <code>usePushNotifications</code>. Подписка создаётся в браузере; серверной
				отправки в этом репозитории нет.
			</p>

			<div className={`push-screen__badge ${badgeClass}`} role='status' aria-label={statusLabel}>
				{statusLabel}
			</div>

			<div className='push-screen__actions'>
				{canRequest && (
					<button
						type='button'
						className='push-screen__button'
						aria-label='Запросить разрешение на уведомления'
						onClick={() => void requestPermission()}
					>
						Запросить разрешение
					</button>
				)}

				{canSubscribe && (
					<button
						type='button'
						className='push-screen__button'
						aria-label='Подписаться на push'
						onClick={() => void subscribe()}
					>
						Подписаться
					</button>
				)}

				{canUnsubscribe && (
					<button
						type='button'
						className='push-screen__button'
						aria-label='Отписаться от push'
						onClick={() => void unsubscribe()}
					>
						Отписаться
					</button>
				)}

				{canLocalNotify && (
					<button
						type='button'
						className='push-screen__button'
						aria-label='Показать локальное уведомление'
						onClick={() => void showLocalNotification()}
					>
						Показать локальное уведомление
					</button>
				)}
			</div>

			{message && <p className='push-screen__message'>{message}</p>}
			{error && (
				<p className='push-screen__error' role='alert'>
					{error}
				</p>
			)}

			{!supported && (
				<p role='status' aria-label='Push не поддерживается'>
					Notification / Service Worker недоступны в этом окружении.
				</p>
			)}

			<dl className='push-screen__fields'>
				<dt>supported</dt>
				<dd>{supported ? 'да' : 'нет'}</dd>

				<dt>permission</dt>
				<dd>{permission}</dd>

				<dt>hasSubscription</dt>
				<dd>{subscription ? 'да' : 'нет'}</dd>

				<dt>endpoint</dt>
				<dd>{subscription ? shortenEndpoint(subscription.endpoint) : '—'}</dd>
			</dl>
		</section>
	);
}

function BackendSection() {
	return (
		<section className='push-screen__section' role='region' aria-labelledby='push-backend-heading'>
			<h3 id='push-backend-heading'>Роль backend</h3>

			<p>
				В реальном приложении сервер хранит подписки и отправляет Web Push. В этом учебном
				frontend-репозитории backend намеренно отсутствует.
			</p>

			<ul className='push-screen__list'>
				{backendDuties.map((duty) => (
					<li key={duty.id}>
						<span className='push-screen__duty-title'>{duty.title}</span>
						{duty.description}
					</li>
				))}
			</ul>
		</section>
	);
}

function DevToolsSection() {
	return (
		<section className='push-screen__section' role='region' aria-labelledby='push-devtools-heading'>
			<h3 id='push-devtools-heading'>DevTools</h3>

			<ul className='push-screen__list'>
				{pushDevToolsItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>

			<p className='push-screen__hint'>{pushPreviewHint}</p>
		</section>
	);
}

function LimitsSection() {
	return (
		<section className='push-screen__section' role='region' aria-labelledby='push-limits-heading'>
			<h3 id='push-limits-heading'>Ограничения</h3>

			<ul className='push-screen__list'>
				{pushLimitsItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</section>
	);
}

function ServiceWorkerLinkSection() {
	return (
		<section className='push-screen__section' role='region' aria-labelledby='push-sw-link-heading'>
			<h3 id='push-sw-link-heading'>Связь с Service Worker</h3>

			<p>
				Доставка push и клик по уведомлению обрабатываются в Service Worker (<code>push</code> /{' '}
				<code>notificationclick</code>). Базовые понятия SW — в разделе{' '}
				<Link to='/service-worker'>Service Worker</Link>.
			</p>
		</section>
	);
}

export function PushScreen() {
	return (
		<div className='push-screen'>
			<h2>Web Push</h2>

			<div className='push-screen__intro'>
				{pushIntro.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<HowItWorksSection />
			<PushDemoSection />
			<BackendSection />
			<DevToolsSection />
			<LimitsSection />
			<ServiceWorkerLinkSection />
		</div>
	);
}
