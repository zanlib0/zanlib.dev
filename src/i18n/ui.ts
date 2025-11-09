export const ui = {
	en: {
		nav: {
			articles: 'Blog',
			projects: 'Projects',
			about: 'About',
		},
	},
	pl: {
		nav: {
			articles: 'Blog',
			projects: 'Projekty',
			about: 'O mnie',
		},
	},
} as const;

export type Locale = keyof typeof ui;

export function getNavLinks(locale: Locale) {
	return ui[locale].nav;
}
