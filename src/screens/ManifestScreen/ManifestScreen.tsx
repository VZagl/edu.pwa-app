import { useEffect, useState } from 'react';
import { fetchManifest } from './fetchManifest';
import './ManifestScreen.scss';
import type { ManifestIcon, WebAppManifest } from './types';

function ManifestField({ label, value }: { label: string; value: string }) {
	return (
		<>
			<dt>{label}</dt>
			<dd>{value}</dd>
		</>
	);
}

function ManifestColorField({ label, value }: { label: string; value: string }) {
	return (
		<>
			<dt>{label}</dt>
			<dd className='manifest-screen__color-value'>
				<span
					className='manifest-screen__color-swatch'
					style={{ backgroundColor: value }}
					aria-hidden='true'
				/>
				{value}
			</dd>
		</>
	);
}

function ManifestIcons({ icons }: { icons: ManifestIcon[] }) {
	return (
		<>
			<dt>icons</dt>
			<dd>
				<ul className='manifest-screen__icons-list'>
					{icons.map((icon) => (
						<li key={`${icon.src}-${icon.sizes}`}>
							{icon.src} / {icon.sizes} / {icon.type}
						</li>
					))}
				</ul>
			</dd>
		</>
	);
}

function ManifestData({ manifest }: { manifest: WebAppManifest }) {
	return (
		<section className='manifest-screen__data' aria-labelledby='manifest-data-heading'>
			<h3 id='manifest-data-heading'>Текущие значения manifest</h3>
			<dl className='manifest-screen__fields'>
				<ManifestField label='name' value={manifest.name} />
				<ManifestField label='short_name' value={manifest.short_name} />
				<ManifestField label='start_url' value={manifest.start_url} />
				<ManifestField label='display' value={manifest.display} />
				<ManifestColorField label='theme_color' value={manifest.theme_color} />
				<ManifestColorField label='background_color' value={manifest.background_color} />
				{manifest.description && <ManifestField label='description' value={manifest.description} />}
				{manifest.lang && <ManifestField label='lang' value={manifest.lang} />}
				{manifest.scope && <ManifestField label='scope' value={manifest.scope} />}
				<ManifestIcons icons={manifest.icons} />
			</dl>
		</section>
	);
}

export function ManifestScreen() {
	const [manifest, setManifest] = useState<WebAppManifest | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		let cancelled = false;

		fetchManifest()
			.then((data) => {
				if (!cancelled) {
					setManifest(data);
					setLoading(false);
				}
			})
			.catch(() => {
				if (!cancelled) {
					setError(true);
					setLoading(false);
				}
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className='manifest-screen'>
			<h2>Web App Manifest</h2>

			<div className='manifest-screen__intro'>
				<p>
					Web App Manifest — это JSON-файл, который описывает, как браузер и операционная система должны
					представлять ваше приложение при установке на устройство.
				</p>
				<p>
					Браузер использует manifest, чтобы узнать имя приложения, стартовый URL, режим отображения, цвета
					интерфейса и набор иконок для домашнего экрана.
				</p>
				<p>
					Корректно заполненный manifest — один из ключевых критериев installability: без него установка PWA
					невозможна или будет выглядеть неполноценной.
				</p>
			</div>

			{loading && <p className='manifest-screen__status'>Загрузка данных манифеста…</p>}
			{error && (
				<p className='manifest-screen__status manifest-screen__status--error'>
					Не удалось загрузить манифест
				</p>
			)}
			{manifest && <ManifestData manifest={manifest} />}
		</div>
	);
}
