import { useOnlineStatus } from '../../hooks/useOnlineStatus/useOnlineStatus.ts';
import { navigateFallback, precacheInfo, runtimeRules } from './offlineLessonData';
import './OfflineScreen.scss';

function CachingStrategies() {
	return (
		<section className='offline-screen__data' role='region' aria-labelledby='caching-strategies-heading'>
			<h3 id='caching-strategies-heading'>Стратегии кэширования</h3>

			<div className='offline-screen__subsection'>
				<h4>Precache</h4>
				<p>{precacheInfo.description}</p>
				<dl className='offline-screen__fields'>
					<dt>globPatterns</dt>
					<dd>{precacheInfo.globPatterns.join(', ')}</dd>
				</dl>
			</div>

			<div className='offline-screen__subsection'>
				<h4>Runtime rules</h4>
				<table className='offline-screen__table'>
					<thead>
						<tr>
							<th scope='col'>urlPattern</th>
							<th scope='col'>handler</th>
							<th scope='col'>cacheName</th>
						</tr>
					</thead>
					<tbody>
						{runtimeRules.map((rule) => (
							<tr key={rule.cacheName}>
								<td>
									<code>{rule.urlPattern}</code>
								</td>
								<td>{rule.handler}</td>
								<td>{rule.cacheName}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='offline-screen__subsection'>
				<h4>navigateFallback</h4>
				<p>
					При навигации без сети service worker отдаёт SPA-оболочку: <code>{navigateFallback}</code>
				</p>
			</div>
		</section>
	);
}

function NetworkStatusDemo() {
	const isOnline = useOnlineStatus();

	return (
		<section className='offline-screen__data' role='region' aria-labelledby='network-status-heading'>
			<h3 id='network-status-heading'>Демо: статус сети</h3>

			<p>
				Браузер сообщает о доступности сети через <code>navigator.onLine</code>. Это приблизительный индикатор
				— реальная доступность сервера может отличаться.
			</p>

			<div
				className={`offline-screen__badge ${isOnline ? 'offline-screen__badge--online' : 'offline-screen__badge--offline'}`}
				role='status'
				aria-label={isOnline ? 'В сети' : 'Нет сети'}
			>
				{isOnline ? 'В сети' : 'Нет сети'}
			</div>

			<p>
				Переключите режим <strong>Offline</strong> в DevTools → Network, чтобы увидеть изменение статуса.
			</p>

			<p>
				Глобальный индикатор <code>OfflineIndicator</code> в шапке приложения использует тот же хук{' '}
				<code>useOnlineStatus</code> и появляется только при отсутствии сети.
			</p>
		</section>
	);
}

export function OfflineScreen() {
	return (
		<div className='offline-screen'>
			<h2>Офлайн и кэш</h2>

			<div className='offline-screen__intro'>
				<p>
					Кэширование позволяет PWA работать без сети или при нестабильном соединении. Service worker
					перехватывает запросы и может отдавать ответ из кэша вместо обращения к серверу.
				</p>
				<p>
					<strong>Precache</strong> — статические файлы сборки кэшируются при установке SW.
					<strong> Runtime caching</strong> — правила для запросов во время работы приложения (JSON,
					изображения и т.д.).
				</p>
				<p>
					Не путайте этот учебный раздел <code>/offline</code> с механизмом <code>navigateFallback</code>: при
					офлайн-навигации SW отдаёт <code>index.html</code> как SPA-оболочку, а не содержимое этого урока.
				</p>
			</div>

			<CachingStrategies />
			<NetworkStatusDemo />
		</div>
	);
}
