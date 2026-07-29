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
		bio: {
			writtenBy: 'Written by',
			portraitAlt: 'Portrait',
			text: 'Product engineer. I work with domain experts to turn their knowledge into software. If you have a problem you cannot yet put into words, my <a href="https://cal.zanlib.dev/zanlib">office hours</a> are open, or you can <a href="mailto:hello@zanlib.dev">write to me</a> directly.',
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
		bio: {
			writtenBy: 'Autor',
			portraitAlt: 'Portret',
			text: 'Product engineer. Współpracuję z ekspertami domenowymi i przekuwam ich wiedzę w oprogramowanie. Jeśli masz problem, którego nie potrafisz jeszcze ubrać w słowa, <a href="https://cal.zanlib.dev/zanlib">umów spotkanie</a>—albo po prostu <a href="mailto:hello@zanlib.dev">napisz do mnie</a>.',
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

export function getBio(locale: Locale) {
	return ui[locale].bio;
}
