import type { ComponentType } from 'react';
import { CacheStorageScreen } from '../screens/CacheStorageScreen/CacheStorageScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { InstallScreen } from '../screens/InstallScreen/InstallScreen';
import { ManifestScreen } from '../screens/ManifestScreen/ManifestScreen';
import { OfflineScreen } from '../screens/OfflineScreen/OfflineScreen';
import { ServiceWorkerScreen } from '../screens/ServiceWorkerScreen/ServiceWorkerScreen';
import { StorageScreen } from '../screens/StorageScreen/StorageScreen';

export type LessonRoute = {
	path: string;
	navLabel: string;
	Screen: ComponentType;
};

export const lessonRoutes: LessonRoute[] = [
	{ path: '/', navLabel: 'Главная', Screen: HomeScreen },
	{ path: '/manifest', navLabel: 'Manifest', Screen: ManifestScreen },
	{ path: '/service-worker', navLabel: 'Service Worker', Screen: ServiceWorkerScreen },
	{ path: '/offline', navLabel: 'Offline', Screen: OfflineScreen },
	{ path: '/install', navLabel: 'Install', Screen: InstallScreen },
	{ path: '/cache-storage', navLabel: 'Cache Storage', Screen: CacheStorageScreen },
	{ path: '/storage', navLabel: 'Storage', Screen: StorageScreen },
];
