export type ManifestIcon = {
	src: string;
	sizes: string;
	type: string;
	purpose?: string;
};

export type WebAppManifest = {
	name: string;
	short_name: string;
	start_url: string;
	display: string;
	background_color: string;
	theme_color: string;
	icons: ManifestIcon[];
	description?: string;
	lang?: string;
	scope?: string;
	orientation?: string;
};
