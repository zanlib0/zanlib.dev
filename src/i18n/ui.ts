export const ui = {
	en: {
		nav: {
			articles: 'Blog',
			projects: 'Projects',
			about: 'About',
		},
		footer: {
			privacy: 'Privacy',
		},
	},
	pl: {
		nav: {
			articles: 'Blog',
			projects: 'Projekty',
			about: 'O mnie',
		},
		footer: {
			privacy: 'Prywatność',
		},
	},
} as const;

export type Locale = keyof typeof ui;

export function getNavLinks(locale: Locale) {
	return ui[locale].nav;
}

export function getFooterLinks(locale: Locale) {
	return ui[locale].footer;
}
