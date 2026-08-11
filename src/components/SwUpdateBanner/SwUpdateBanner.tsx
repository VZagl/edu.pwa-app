import { useSwUpdate } from '../../hooks/useSwUpdate.ts';
import './SwUpdateBanner.scss';

export function SwUpdateBanner() {
	const { updateAvailable, applyUpdate } = useSwUpdate();

	if (!updateAvailable) {
		return null;
	}

	return (
		<div className='sw-update-banner' role='status'>
			<p className='sw-update-banner__text'>Доступно обновление</p>
			<button
				type='button'
				className='sw-update-banner__button'
				aria-label='Обновить приложение'
				onClick={applyUpdate}
			>
				Обновить
			</button>
		</div>
	);
}
