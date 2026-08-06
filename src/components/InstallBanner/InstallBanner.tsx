import { useInstallPrompt } from '../../hooks/useInstallPrompt/useInstallPrompt.ts';
import './InstallBanner.scss';

export function InstallBanner() {
	const { canInstall, showFallback, fallbackHint, isInstalled, promptInstall } = useInstallPrompt();

	if (isInstalled || (!canInstall && !showFallback)) {
		return null;
	}

	return (
		<div className='install-banner' role='status'>
			{canInstall ? (
				<>
					<p className='install-banner__text'>Установите приложение на устройство</p>
					<button
						type='button'
						className='install-banner__button'
						aria-label='Установить приложение'
						onClick={promptInstall}
					>
						Установить
					</button>
				</>
			) : (
				<p className='install-banner__text install-banner__text--fallback'>{fallbackHint}</p>
			)}
		</div>
	);
}
