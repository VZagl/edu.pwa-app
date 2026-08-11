import { Link } from 'react-router';
import { useCacheStorage } from '../../hooks/useCacheStorage/useCacheStorage.ts';
import './CacheStorageScreen.scss';
import {
	apiMethods,
	cacheStorageIntro,
	devToolsItems,
	previewHint,
	workboxCacheHints,
} from './cacheStorageLessonData';

function ApiSection() {
	return (
		<section className='cache-storage-screen__section' role='region' aria-labelledby='cache-api-heading'>
			<h3 id='cache-api-heading'>Cache Storage API</h3>

			<p>Основные методы, которые использует демо ниже:</p>

			<ul className='cache-storage-screen__list'>
				{apiMethods.map((method) => (
					<li key={method.id}>
						<span className='cache-storage-screen__item-label'>
							<code>{method.label}</code>
						</span>
						{method.description}
					</li>
				))}
			</ul>
		</section>
	);
}

function CacheDemoSection() {
	const { supported, loading, error, cacheNames, selectedCache, urls, refresh, selectCache } =
		useCacheStorage();
	const isDev = import.meta.env.DEV;

	return (
		<section className='cache-storage-screen__section' role='region' aria-labelledby='cache-demo-heading'>
			<h3 id='cache-demo-heading'>Демо: живые кэши</h3>

			<p>
				Данные из <code>window.caches</code>: имена через <code>caches.keys()</code>, URL выбранного кэша —
				через <code>cache.keys()</code>.
			</p>

			{isDev && <p className='cache-storage-screen__hint'>{previewHint}</p>}

			<div className='cache-storage-screen__toolbar'>
				<button
					type='button'
					className='cache-storage-screen__button'
					aria-label='Обновить список кэшей'
					onClick={() => void refresh()}
					disabled={!supported || loading}
				>
					Обновить
				</button>
			</div>

			{!supported && (
				<p role='status' aria-label='Cache Storage не поддерживается'>
					Cache Storage API недоступен в этом окружении.
				</p>
			)}

			{supported && loading && cacheNames.length === 0 && (
				<p role='status' aria-label='Загрузка кэшей'>
					Загрузка…
				</p>
			)}

			{error && (
				<p className='cache-storage-screen__error' role='alert'>
					{error}
				</p>
			)}

			{supported && !loading && !error && cacheNames.length === 0 && (
				<p role='status' aria-label='Кэши отсутствуют'>
					Кэшей пока нет. Откройте приложение через <code>pnpm preview</code> после сборки или подождите
					установки Service Worker.
				</p>
			)}

			{cacheNames.length > 0 && (
				<div className='cache-storage-screen__demo-grid'>
					<div>
						<h4 id='cache-names-heading'>Имена кэшей</h4>
						<ul className='cache-storage-screen__cache-list' aria-labelledby='cache-names-heading'>
							{cacheNames.map((name) => (
								<li key={name}>
									<button
										type='button'
										className={`cache-storage-screen__cache-button${selectedCache === name ? ' cache-storage-screen__cache-button--selected' : ''}`}
										aria-pressed={selectedCache === name}
										aria-label={`Выбрать кэш ${name}`}
										onClick={() => void selectCache(name)}
									>
										{name}
									</button>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 id='cache-urls-heading'>URL записей</h4>
						{selectedCache === null ? (
							<p className='cache-storage-screen__muted'>Выберите кэш, чтобы увидеть URL.</p>
						) : loading ? (
							<p role='status' aria-label='Загрузка URL'>
								Загрузка URL…
							</p>
						) : urls.length === 0 ? (
							<p role='status' aria-label='Записи отсутствуют'>
								В кэше <code>{selectedCache}</code> нет записей.
							</p>
						) : (
							<ul className='cache-storage-screen__url-list' aria-labelledby='cache-urls-heading'>
								{urls.map((url) => (
									<li key={url}>
										<code>{url}</code>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</section>
	);
}

function WorkboxSection() {
	return (
		<section className='cache-storage-screen__section' role='region' aria-labelledby='workbox-heading'>
			<h3 id='workbox-heading'>Связь с Offline / Workbox</h3>

			<p>
				Правила precache и runtime описаны в разделе{' '}
				<Link to='/offline'>Offline</Link>. Здесь — фактическое содержимое Cache Storage.
			</p>

			<ul className='cache-storage-screen__list'>
				{workboxCacheHints.map((hint) => (
					<li key={hint.id}>
						<span className='cache-storage-screen__item-label'>{hint.name}</span>
						{hint.description}
					</li>
				))}
			</ul>
		</section>
	);
}

function DevToolsSection() {
	return (
		<section className='cache-storage-screen__section' role='region' aria-labelledby='devtools-heading'>
			<h3 id='devtools-heading'>DevTools</h3>

			<ul className='cache-storage-screen__list'>
				{devToolsItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>

			<p className='cache-storage-screen__hint'>{previewHint}</p>
		</section>
	);
}

export function CacheStorageScreen() {
	return (
		<div className='cache-storage-screen'>
			<h2>Cache Storage</h2>

			<div className='cache-storage-screen__intro'>
				{cacheStorageIntro.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<ApiSection />
			<CacheDemoSection />
			<WorkboxSection />
			<DevToolsSection />
		</div>
	);
}
