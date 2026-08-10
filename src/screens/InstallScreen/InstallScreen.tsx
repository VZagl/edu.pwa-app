import { useInstallPrompt } from '../../hooks/useInstallPrompt/useInstallPrompt.ts';
import './InstallScreen.scss';
import {
	devToolsItems,
	installIntro,
	installabilityCriteria,
	platformInstructions,
	previewHint,
} from './installLessonData';

function detectDisplayMode(): {
	isStandaloneDisplay: boolean;
	isIosStandalone: boolean;
	modeLabel: string;
} {
	const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
	const isIosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true;
	const modeLabel = isStandaloneDisplay || isIosStandalone ? 'standalone' : 'вкладка браузера';

	return { isStandaloneDisplay, isIosStandalone, modeLabel };
}

function InstallabilitySection() {
	return (
		<section className='install-screen__section' role='region' aria-labelledby='installability-heading'>
			<h3 id='installability-heading'>Условия installability</h3>

			<p>Браузер проверяет критерии перед событием beforeinstallprompt. Краткий чеклист:</p>

			<ul className='install-screen__checklist'>
				{installabilityCriteria.map((criterion) => (
					<li key={criterion.id}>
						<span className='install-screen__criterion'>{criterion.label}</span>
						{criterion.description}
					</li>
				))}
			</ul>
		</section>
	);
}

function InstallDemoSection() {
	const { canInstall, showFallback, fallbackHint, isInstalled, promptInstall } = useInstallPrompt();
	const isDev = import.meta.env.DEV;

	let statusLabel: string;
	let badgeClass: string;

	if (isInstalled) {
		statusLabel = 'Установлено';
		badgeClass = 'install-screen__badge--installed';
	} else if (canInstall) {
		statusLabel = 'Можно установить';
		badgeClass = 'install-screen__badge--can-install';
	} else if (showFallback) {
		statusLabel = 'Ручная установка';
		badgeClass = 'install-screen__badge--fallback';
	} else {
		statusLabel = 'Ожидание…';
		badgeClass = 'install-screen__badge--waiting';
	}

	return (
		<section className='install-screen__section' role='region' aria-labelledby='install-demo-heading'>
			<h3 id='install-demo-heading'>Демо: статус установки</h3>

			<p>
				Живые данные из хука <code>useInstallPrompt</code>: canInstall, fallback и isInstalled обновляются при{' '}
				<code>beforeinstallprompt</code>, <code>appinstalled</code> и по таймеру grace period.
			</p>

			{isDev && <p className='install-screen__hint'>{previewHint}</p>}

			<div className={`install-screen__badge ${badgeClass}`} role='status' aria-label={statusLabel}>
				{statusLabel}
			</div>

			{canInstall && (
				<button
					type='button'
					className='install-screen__install-button'
					aria-label='Установить приложение'
					onClick={() => void promptInstall()}
				>
					Установить
				</button>
			)}

			{showFallback && !isInstalled && <p className='install-screen__fallback'>{fallbackHint}</p>}

			<dl className='install-screen__fields'>
				<dt>canInstall</dt>
				<dd>{canInstall ? 'да' : 'нет'}</dd>

				<dt>showFallback</dt>
				<dd>{showFallback ? 'да' : 'нет'}</dd>

				<dt>isInstalled</dt>
				<dd>{isInstalled ? 'да' : 'нет'}</dd>
			</dl>
		</section>
	);
}

function DisplayModeSection() {
	const { isStandaloneDisplay, isIosStandalone, modeLabel } = detectDisplayMode();

	return (
		<section className='install-screen__section' role='region' aria-labelledby='display-mode-heading'>
			<h3 id='display-mode-heading'>display-mode</h3>

			<p>
				После установки PWA запускается в режиме <strong>standalone</strong> — без UI браузера. В обычной
				вкладке <code>display-mode</code> остаётся browser.
			</p>

			<div
				className={`install-screen__badge ${modeLabel === 'standalone' ? 'install-screen__badge--installed' : 'install-screen__badge--waiting'}`}
				role='status'
				aria-label={modeLabel}
			>
				{modeLabel}
			</div>

			<dl className='install-screen__fields'>
				<dt>matchMedia('(display-mode: standalone)')</dt>
				<dd>{isStandaloneDisplay ? 'true' : 'false'}</dd>

				<dt>navigator.standalone (iOS)</dt>
				<dd>{isIosStandalone ? 'true' : 'false'}</dd>
			</dl>
		</section>
	);
}

function PlatformInstructionsSection() {
	return (
		<section className='install-screen__section' role='region' aria-labelledby='platforms-heading'>
			<h3 id='platforms-heading'>Инструкции по платформам</h3>

			<ul className='install-screen__platforms'>
				{platformInstructions.map((item) => (
					<li key={item.platform}>
						<span className='install-screen__platform'>{item.platform}</span>
						{item.method}
					</li>
				))}
			</ul>
		</section>
	);
}

function DevToolsSection() {
	return (
		<section className='install-screen__section' role='region' aria-labelledby='devtools-heading'>
			<h3 id='devtools-heading'>DevTools</h3>

			<ul className='install-screen__devtools'>
				{devToolsItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>

			<p className='install-screen__hint'>{previewHint}</p>
		</section>
	);
}

function BannerConnectionSection() {
	return (
		<section className='install-screen__section' role='region' aria-labelledby='banner-heading'>
			<h3 id='banner-heading'>Связь с баннером</h3>

			<p>
				Компонент <code>InstallBanner</code> в шапке приложения подписан на <code>useInstallPrompt</code>: при{' '}
				<code>canInstall</code> — кнопка «Установить»; при отсутствии prompt — <code>fallbackHint</code>;
				после установки баннер скрывается.
			</p>
		</section>
	);
}

export function InstallScreen() {
	return (
		<div className='install-screen'>
			<h2>Установка PWA</h2>

			<div className='install-screen__intro'>
				{installIntro.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<InstallabilitySection />
			<InstallDemoSection />
			<DisplayModeSection />
			<PlatformInstructionsSection />
			<DevToolsSection />
			<BannerConnectionSection />
		</div>
	);
}
