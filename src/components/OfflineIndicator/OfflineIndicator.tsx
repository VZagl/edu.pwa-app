import { useOnlineStatus } from '../../hooks/useOnlineStatus/useOnlineStatus.ts';
import './OfflineIndicator.scss';

export function OfflineIndicator() {
	const isOnline = useOnlineStatus();

	if (isOnline) {
		return null;
	}

	return (
		<div className='offline-indicator' role='status' aria-label='Нет сети'>
			<span className='offline-indicator__dot' aria-hidden='true' />
			<span className='offline-indicator__label'>offline</span>
		</div>
	);
}
