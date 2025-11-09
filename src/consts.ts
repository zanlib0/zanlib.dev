// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

type Locale = 'en' | 'pl';

export const SITE_META = {
	en: {
		title: 'zanlib',
		description: 'Product Engineer & Digital Craftsman',
	},
	pl: {
		title: 'zanlib',
		description: 'Product Engineer i Digital Craftsman',
	},
} as const;

export function getSiteMetadata(locale: Locale | string | undefined) {
	const validLocale = (locale === 'pl' ? 'pl' : 'en') as Locale;
	return SITE_META[validLocale];
}

// Deprecated: Use getSiteMetadata() instead
export const SITE_TITLE = 'zanlib';
export const SITE_DESCRIPTION = 'Product Engineer & Digital Craftsman';
