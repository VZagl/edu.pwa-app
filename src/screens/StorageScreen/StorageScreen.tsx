import { Link } from 'react-router';
import {
	calcUsagePercent,
	formatBytes,
	useStorageQuota,
} from '../../hooks/useStorageQuota/useStorageQuota.ts';
import './StorageScreen.scss';
import { apiMethods, devToolsItems, limitsHints, storageIntro } from './storageLessonData';

function ApiSection() {
	return (
		<section className='storage-screen__section' role='region' aria-labelledby='storage-api-heading'>
			<h3 id='storage-api-heading'>Storage API</h3>

			<p>Методы StorageManager, которые использует демо ниже:</p>

			<ul className='storage-screen__list'>
				{apiMethods.map((method) => (
					<li key={method.id}>
						<span className='storage-screen__item-label'>
							<code>{method.label}</code>
						</span>
						{method.description}
					</li>
				))}
			</ul>
		</section>
	);
}

function formatPersistedLabel(persisted: boolean | null): string {
	if (persisted === null) {
		return 'неизвестно';
	}

	return persisted ? 'да (persistent)' : 'нет (может быть вытеснено)';
}

function DemoSection() {
	const { supported, loading, error, usage, quota, persisted, refresh, requestPersist } = useStorageQuota();
	const percent = calcUsagePercent(usage, quota);

	return (
		<section className='storage-screen__section' role='region' aria-labelledby='storage-demo-heading'>
			<h3 id='storage-demo-heading'>Демо: квота и Persistent</h3>

			<p>
				Живые данные из <code>navigator.storage</code>: usage/quota через <code>estimate()</code>, статус —
				через <code>persisted()</code>.
			</p>

			<div className='storage-screen__toolbar'>
				<button
					type='button'
					className='storage-screen__button'
					aria-label='Обновить оценку хранилища'
					onClick={() => void refresh()}
					disabled={!supported || loading}
				>
					Обновить
				</button>
				<button
					type='button'
					className='storage-screen__button'
					aria-label='Запросить Persistent Storage'
					onClick={() => void requestPersist()}
					disabled={!supported || loading}
				>
					Запросить Persistent Storage
				</button>
			</div>

			{!supported && (
				<p role='status' aria-label='Storage API не поддерживается'>
					Storage API (<code>navigator.storage</code>) недоступен в этом окружении.
				</p>
			)}

			{supported && loading && usage === null && quota === null && (
				<p role='status' aria-label='Загрузка оценки хранилища'>
					Загрузка…
				</p>
			)}

			{error && (
				<p className='storage-screen__error' role='alert'>
					{error}
				</p>
			)}

			{supported && !error && (usage !== null || quota !== null || persisted !== null) && (
				<dl className='storage-screen__stats' aria-label='Оценка хранилища'>
					<div>
						<dt>Usage</dt>
						<dd>
							<code>{usage ?? '—'}</code> байт ({formatBytes(usage)})
						</dd>
					</div>
					<div>
						<dt>Quota</dt>
						<dd>
							<code>{quota ?? '—'}</code> байт ({formatBytes(quota)})
						</dd>
					</div>
					<div>
						<dt>Заполнение</dt>
						<dd aria-label='Процент заполнения'>{percent === null ? '—' : `${percent.toFixed(2)}%`}</dd>
					</div>
					<div>
						<dt>Persisted</dt>
						<dd aria-label='Статус Persistent Storage'>{formatPersistedLabel(persisted)}</dd>
					</div>
				</dl>
			)}
		</section>
	);
}

function LimitsSection() {
	return (
		<section className='storage-screen__section' role='region' aria-labelledby='limits-heading'>
			<h3 id='limits-heading'>Лимиты и вытеснение</h3>

			<ul className='storage-screen__list'>
				{limitsHints.map((hint) => (
					<li key={hint.id}>
						<span className='storage-screen__item-label'>{hint.title}</span>
						{hint.description}
					</li>
				))}
			</ul>
		</section>
	);
}

function DevToolsSection() {
	return (
		<section className='storage-screen__section' role='region' aria-labelledby='devtools-heading'>
			<h3 id='devtools-heading'>DevTools</h3>

			<ul className='storage-screen__list'>
				{devToolsItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</section>
	);
}

function CacheStorageLinkSection() {
	return (
		<section className='storage-screen__section' role='region' aria-labelledby='cache-storage-link-heading'>
			<h3 id='cache-storage-link-heading'>Связь с Cache Storage</h3>

			<p>
				Квота учитывает Cache Storage вместе с другими хранилищами origin. Содержимое отдельных кэшей смотрите
				в разделе <Link to='/cache-storage'>Cache Storage</Link>.
			</p>
		</section>
	);
}

export function StorageScreen() {
	return (
		<div className='storage-screen'>
			<h2>Storage</h2>

			<div className='storage-screen__intro'>
				{storageIntro.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<ApiSection />
			<DemoSection />
			<LimitsSection />
			<DevToolsSection />
			<CacheStorageLinkSection />
		</div>
	);
}
