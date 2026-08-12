import { useSwUpdate } from '../../hooks/useSwUpdate.ts';
import './SwUpdateBanner.scss';

export function SwUpdateBanner() {
	const { updateAvailable, isApplying, isDownloading, applyUpdate } = useSwUpdate();

	if (isDownloading) {
		return (
			<div className='sw-update-banner' role='status'>
				<p className='sw-update-banner__text'>Загружается обновление…</p>
				<div
					className='sw-update-banner__progress'
					role='progressbar'
					aria-label='Загрузка обновления'
					aria-valuetext='Загрузка'
				>
					<div className='sw-update-banner__progress-bar' />
				</div>
			</div>
		);
	}

	if (!updateAvailable) {
		return null;
	}

	const buttonLabel = isApplying ? 'Обновляется…' : 'Обновить';

	return (
		<div className='sw-update-banner' role='status'>
			<p className='sw-update-banner__text'>Доступно обновление</p>
			<button
				type='button'
				className='sw-update-banner__button'
				aria-label={isApplying ? 'Приложение обновляется' : 'Обновить приложение'}
				aria-busy={isApplying}
				disabled={isApplying}
				onClick={applyUpdate}
			>
				{buttonLabel}
			</button>
		</div>
	);
}
