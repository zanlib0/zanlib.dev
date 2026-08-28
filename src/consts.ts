export type Locale = 'en' | 'pl';

export const SITE_TITLE = 'zanlib';
export const SITE_URL = 'https://zanlib.dev/';
export const WEBSITE_ID = `${SITE_URL}#website`;

export const AUTHOR = {
	name: 'Marek Chotoborski',
	id: `${SITE_URL}#person`,
	jobTitle: 'Product Engineer',
	twitterHandle: '@zanlib0',
	sameAs: [
		'https://github.com/zanlib0',
		'https://www.linkedin.com/in/marek-chotoborski-1b5562153',
		'https://x.com/zanlib0',
	],
} as const;

export const AUTHOR_INTRO = {
	en: 'I work with domain experts to turn their knowledge into software. Whether that\'s clinical trials for cancer research or enterprise accounting systems, I learn enough about the field to understand the problem and help decide what to build.',
	pl: 'Buduję oprogramowanie razem z ekspertami domenowymi, którzy znają problem od środka. Uczę się od nich tak, by dobrze zrozumieć ich pracę i wspólnie podejmować decyzje o tym, co warto budować. Tak pracowałem między innymi nad narzędziami do planowania badań klinicznych i systemami księgowymi dla dużych firm.',
} as const satisfies Record<Locale, string>;

export const OG_LOCALES = {
	en: 'en_GB',
	pl: 'pl_PL',
} as const satisfies Record<Locale, string>;

export const PAGE_METADATA = {
	en: {
		home: {
			title: AUTHOR.name,
			description: AUTHOR_INTRO.en,
		},
		blog: {
			title: 'Blog',
			description: 'Articles, notes, and jots on software engineering, product work, philosophy, faith, and the humanities.',
		},
		about: {
			title: 'About',
			description: AUTHOR_INTRO.en,
		},
	},
	pl: {
		home: {
			title: AUTHOR.name,
			description: AUTHOR_INTRO.pl,
		},
		blog: {
			title: 'Blog',
			description: 'Artykuły, notatki i szkice o programowaniu, pracy produktowej, filozofii, wierze i humanistyce.',
		},
		about: {
			title: 'O mnie',
			description: AUTHOR_INTRO.pl,
		},
	},
} as const satisfies Record<Locale, Record<string, { title: string; description: string }>>;

export const SITE_META = {
	en: {
		title: SITE_TITLE,
		description: AUTHOR_INTRO.en,
	},
	pl: {
		title: SITE_TITLE,
		description: AUTHOR_INTRO.pl,
	},
} as const;

export function getSiteMetadata(locale: Locale | string | undefined) {
	const validLocale = (locale === 'pl' ? 'pl' : 'en') as Locale;
	return SITE_META[validLocale];
}
