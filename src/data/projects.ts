import type { Locale } from '../consts';

export interface Text {
	en: string;
	pl: string;
}

export const MAGNITUDES = ['hours', 'days', 'weeks', 'months', 'years'] as const;
export type Magnitude = (typeof MAGNITUDES)[number];

export const STATES = ['act', 'maint', 'fin', 'exp', 'plan', 'frag', 'wd', 'ruin', 'lost'] as const;
export type State = (typeof STATES)[number];

export const MEDIA = [
	'website',
	'saas',
	'interpreter',
	'library',
	'extension',
	'bot',
	'workshop',
	'community',
	'puzzle',
] as const;
export type Medium = (typeof MEDIA)[number];

export type Mark = boolean | undefined;

export interface Ref {
	label: string;
	href: string;
}

export interface Project {
	object: string;
	begin: number;
	end: number | null;
	medium: Medium;
	state: State;
	magnitude: Magnitude;
	published: Mark;
	used: Mark;
	again: Mark;
	moving: Mark;
	tags: string[];
	refs: Ref[];
	etymology?: Text;
	observation?: Text;
}


type Vocabulary<K extends string> = Record<Locale, Record<K, { short: string; gloss: string }>>;

export const STATE_LABELS: Vocabulary<State> = {
	en: {
		act: { short: 'act.', gloss: 'active, still being built' },
		maint: { short: 'maint.', gloss: 'maintained, alive but only repaired' },
		fin: { short: 'fin.', gloss: 'finished, complete and left alone' },
		exp: { short: 'exp.', gloss: 'experiment, made to answer a question' },
		plan: { short: 'plan.', gloss: 'planned, announced but not begun' },
		frag: { short: 'frag.', gloss: 'fragment, never brought to a whole' },
		wd: { short: 'wd.', gloss: 'withdrawn, published then retracted' },
		ruin: { short: 'ruin', gloss: 'ruin, survives but no longer runs' },
		lost: { short: 'lost', gloss: 'lost, no copy survives' },
	},
	pl: {
		act: { short: 'akt.', gloss: 'aktywne, wciąż powstaje' },
		maint: { short: 'utrz.', gloss: 'utrzymywane, żyje ale tylko naprawiane' },
		fin: { short: 'ukoń.', gloss: 'ukończone, skończone i zostawione w spokoju' },
		exp: { short: 'eksp.', gloss: 'eksperyment, zrobione by odpowiedzieć na pytanie' },
		plan: { short: 'plan.', gloss: 'planowane, zapowiedziane lecz nierozpoczęte' },
		frag: { short: 'fragm.', gloss: 'fragment, nigdy nie doprowadzone do całości' },
		wd: { short: 'wyc.', gloss: 'wycofane, opublikowane a potem odwołane' },
		ruin: { short: 'ruina', gloss: 'ruina, zachowane lecz już nie działa' },
		lost: { short: 'zag.', gloss: 'zaginione, żadna kopia nie przetrwała' },
	},
};

export const MAGNITUDE_LABELS: Vocabulary<Magnitude> = {
	en: {
		hours: { short: 'h', gloss: 'hours' },
		days: { short: 'd', gloss: 'days' },
		weeks: { short: 'wk', gloss: 'weeks' },
		months: { short: 'mo', gloss: 'months' },
		years: { short: 'yr', gloss: 'years' },
	},
	pl: {
		hours: { short: 'godz.', gloss: 'godziny' },
		days: { short: 'dni', gloss: 'dni' },
		weeks: { short: 'tyg.', gloss: 'tygodnie' },
		months: { short: 'mies.', gloss: 'miesiące' },
		years: { short: 'lata', gloss: 'lata' },
	},
};

export const MEDIUM_LABELS: Record<Locale, Record<Medium, string>> = {
	en: {
		website: 'website',
		saas: 'saas',
		interpreter: 'interpreter',
		library: 'library',
		extension: 'extension',
		bot: 'bot',
		workshop: 'workshop',
		community: 'community',
		puzzle: 'puzzle',
	},
	pl: {
		website: 'strona',
		saas: 'saas',
		interpreter: 'interpreter',
		library: 'biblioteka',
		extension: 'rozszerzenie',
		bot: 'bot',
		workshop: 'warsztat',
		community: 'społeczność',
		puzzle: 'łamigłówki'
	},
};

export const CATALOGUE_UI = {
	en: {
		heading: { line1: 'Works, attempts', line2: '& other projects' },
		intro: 'A selective register of all the various things I’ve done over the years.',
		key: 'Key',
		keyState: 'State',
		keyMagnitude: 'Mag.',
		keyMarks: 'Marks',
		markYes: 'yes',
		markNo: 'no',
		markUnknown: 'not determined',
		columns: {
			number: '#',
			object: 'Object',
			begin: 'Beg.',
			end: 'End',
			medium: 'Medium',
			state: 'State',
			magnitude: 'Mag.',
			published: 'Publ.',
			used: 'Used',
			again: 'Again?',
			moving: 'Moving?',
			tags: 'Tags',
			refs: 'Ref.',
			etymology: 'Etymology',
			observation: 'Observation',
		},
	},
	pl: {
		heading: { line1: 'Prace, próby', line2: 'i inne projekty' },
		intro: 'Wybiórczy rejestr rozmaitych rzeczy, które zrobiłem przez lata.',
		key: 'Klucz',
		keyState: 'Stan',
		keyMagnitude: 'Skala',
		keyMarks: 'Znaki',
		markYes: 'tak',
		markNo: 'nie',
		markUnknown: 'nierozstrzygnięte',
		columns: {
			number: '#',
			object: 'Obiekt',
			begin: 'Pocz.',
			end: 'Kon.',
			medium: 'Medium',
			state: 'Stan',
			magnitude: 'Skala',
			published: 'Opubl.',
			used: 'Używ.',
			again: 'Znów?',
			moving: 'W ruchu?',
			tags: 'Tagi',
			refs: 'Odn.',
			etymology: 'Etymologia',
			observation: 'Obserwacja',
		},
	},
} as const satisfies Record<Locale, unknown>;

export function getCatalogueUi(locale: Locale) {
	return CATALOGUE_UI[locale];
}

export const projects: Project[] = [
	{
		object: 'zanlib.dev',
		begin: 2017,
		end: null,
		medium: 'website',
		state: 'act',
		magnitude: 'years',
		published: true,
		used: true,
		again: undefined,
		moving: true,
		tags: ['Astro', 'MDX', 'TypeScript'],
		refs: [{ label: 'web', href: 'https://zanlib.dev/' }],
		etymology: {
			en: 'A meaningless word, pronounceable in both Polish and English phonetic registers.',
			pl: 'Słowo bez znaczenia, wymawialne zarówno po polsku, jak i po angielsku.',
		},
		observation: {
			en: 'A bilingual commonplace book for articles, notes, and jots, each with its own typographic treatment.',
			pl: 'Dwujęzyczny blog: artykuły, notatki i szkice.',
		},
	},
	{
		object: 'Vlvbione',
		begin: 2025,
		end: null,
		medium: 'saas',
		state: 'maint',
		magnitude: 'months',
		published: true,
		used: true,
		again: true,
		moving: true,
		tags: ['React Router 7', 'TypeScript', 'SQLite'],
		refs: [{ label: 'web', href: 'https://vlvbione.pl' }],
		observation: {
			en: 'Review collection for small businesses: a customer scans a <abbr>QR</abbr> code, leaves feedback, and receives a coupon. Self-hosted end to end, Gitea and <abbr>CI</abbr> included, on a ThinkStation in my bookshelf.',
			pl: 'Zbieranie opinii dla małych firm: klient skanuje kod <abbr>QR</abbr>, zostawia opinię i dostaje kupon. Całość, razem z Gitem i <abbr>CI</abbr>, hostowana na ThinkStation na półce.',
		},
	},
	{
		object: 'isolisp',
		begin: 2026,
		end: null,
		medium: 'interpreter',
		state: 'act',
		magnitude: 'days',
		published: true,
		used: false,
		again: true,
		moving: true,
		tags: ['JavaScript'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/isolisp' }],
		etymology: {
			en: 'Greek <em>ísos</em>, equal—the same Lisp on both sides of the wire.',
			pl: 'Greckie <em>ísos</em>, równy—ten sam Lisp po obu stronach łącza.',
		},
		observation: {
			en: 'A Lisp that runs identically on the client and the server: define a validation rule once, evaluate it wherever it is needed.',
			pl: 'Lisp działający identycznie po stronie klienta i serwera: regułę walidacji definiuje się raz, a oblicza tam, gdzie akurat trzeba.',
		},
	},
	{
		object: 'lispex',
		begin: 2025,
		end: 2025,
		medium: 'interpreter',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: false,
		again: true,
		moving: false,
		tags: ['Elixir'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/lispex' }],
		etymology: {
			en: 'Lisp, in <em>ex</em>—the customary suffix for an Elixir package.',
			pl: 'Lisp z końcówką <em>ex</em>—zwyczajowym sufiksem pakietów Elixira.',
		},
		observation: {
			en: 'A toy Lisp evaluator written to find out what pattern matching does to an interpreter loop.',
			pl: 'Zabawkowy ewaluator Lispa, napisany żeby sprawdzić, co dopasowanie wzorców robi z pętlą interpretera.',
		},
	},
	{
		object: 'evalexpr',
		begin: 2025,
		end: 2025,
		medium: 'interpreter',
		state: 'fin',
		magnitude: 'hours',
		published: true,
		used: true,
		again: true,
		moving: false,
		tags: ['Node.js'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/evalexpr' }],
		etymology: {
			en: 'Evaluate expression. The whole program is the name.',
			pl: 'Evaluate expression—oblicz wyrażenie. Cały program mieści się w nazwie.',
		},
		observation: {
			en: 'A Lisp in sixty-six lines, written as the companion to <a href="/blog/lisp-in-js">an article</a> and no longer than the article deserved.',
			pl: 'Lisp w sześćdziesięciu sześciu liniach, napisany jako towarzysz <a href="/pl/blog/lisp-in-js">artykułu</a> i nie dłuższy, niż artykuł na to zasługiwał.',
		},
	},
	{
		object: 'Formuj',
		begin: 2020,
		end: 2022,
		medium: 'library',
		state: 'wd',
		magnitude: 'months',
		published: true,
		used: true,
		again: false,
		moving: false,
		tags: ['React', 'Formik'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/formuj' }],
		etymology: {
			en: 'Polish imperative of <em>formować</em>, to form—and a pun on the forms it built.',
			pl: 'Tryb rozkazujący od <em>formować</em>—i kalambur na formularzach, które budowała.',
		},
		observation: {
			en: 'A form library on top of Formik, used in production. A mini-framework built to avoid writing forms, which is a good description of why it was a mistake.',
			pl: 'Biblioteka formularzy zbudowana na Formiku, używana produkcyjnie. Mini-framework napisany po to, żeby nie pisać formularzy—co dobrze tłumaczy, dlaczego był pomyłką.',
		},
	},
	{
		object: 'wouldn’t you rather',
		begin: 2021,
		end: 2021,
		medium: 'extension',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: true,
		again: true,
		moving: false,
		tags: ['Chrome', 'JavaScript'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/wouldnt-you-rather' }],
		etymology: {
			en: 'The question the extension asks, verbatim.',
			pl: 'Pytanie, które zadaje rozszerzenie, dosłownie.',
		},
		observation: {
			en: 'Interposes a question between you and a time-wasting website: would you not rather be doing something else?',
			pl: 'Wstawia pytanie między użytkownika a stronę pożerającą czas: czy nie wolałbyś robić czegoś innego?',
		},
	},
	{
		object: 'Rolex',
		begin: 2022,
		end: 2022,
		medium: 'bot',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: true,
		again: true,
		moving: false,
		tags: ['Elixir', 'Nostrum'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/rolex' }],
		etymology: {
			en: 'Roles, in <em>ex</em>. The watch is a coincidence and the joke is deliberate.',
			pl: 'Role z końcówką <em>ex</em>. Zegarek to zbieg okoliczności, żart—zamierzony.',
		},
		observation: {
			en: 'A Discord bot that lets members of a server assign themselves programming-language roles without troubling anyone.',
			pl: 'Bot Discorda pozwalający członkom serwera samodzielnie przypisywać sobie role językowe, bez zawracania głowy administracji.',
		},
	},
	{
		object: 'Rosary Café',
		begin: 2021,
		end: 2021,
		medium: 'website',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: true,
		again: true,
		moving: false,
		tags: ['Svelte'],
		refs: [{ label: 'web', href: 'https://rosarycafe.intercaetera.com' }],
		observation: {
			en: 'A frontend-only rosary assistant, built in a version of Svelte now ancient enough to be of archaeological interest.',
			pl: 'Asystent różańcowy działający wyłącznie po stronie przeglądarki, napisany w wersji Svelte na tyle wiekowej, że budzi już zainteresowanie archeologiczne.',
		},
	},
	{
		object: 'Catholic Programmers Discord',
		begin: 2021,
		end: null,
		medium: 'community',
		state: 'act',
		magnitude: 'years',
		published: true,
		used: true,
		again: true,
		moving: true,
		tags: ['Discord'],
		refs: [{ label: 'inv', href: 'https://discord.gg/NfVgpm3gvE' }],
		observation: {
			en: 'An English-speaking community for Catholic software developers, which has outlived every other server I have joined.',
			pl: 'Anglojęzyczna społeczność katolickich programistów, która przetrwała każdy inny serwer, na jaki kiedykolwiek wszedłem.',
		},
	},
	{
		object: 'Product Communication for Developers',
		begin: 2026,
		end: null,
		medium: 'workshop',
		state: 'plan',
		magnitude: 'weeks',
		published: false,
		used: undefined,
		again: undefined,
		moving: true,
		tags: [],
		refs: [],
		observation: {
			en: 'A workshop on saying what you mean to the people who decide what gets built. Announced, not yet given.',
			pl: 'Warsztat o mówieniu wprost do tych, którzy decydują, co powstanie. Zapowiedziany, jeszcze nie poprowadzony.',
		},
	},
	{
		object: 'Brainhub Junior Workshops',
		begin: 2024,
		end: 2024,
		medium: 'workshop',
		state: 'fin',
		magnitude: 'weeks',
		published: true,
		used: true,
		again: true,
		moving: false,
		tags: ['JavaScript', 'React'],
		refs: [],
		observation: {
			en: 'The frontend track of a two-week recruiting intensive for junior developers, covering the whole delivery path from product analysis to cloud deployment.',
			pl: 'Ścieżka frontendowa dwutygodniowego intensywnego kursu rekrutacyjnego dla juniorów, obejmująca całą drogę wytwarzania—od analizy produktu po wdrożenie w chmurze.',
		},
	},
	{
		object: 'Elixir Saturday',
		begin: 2023,
		end: 2023,
		medium: 'workshop',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: true,
		again: true,
		moving: false,
		tags: ['Elixir', 'Phoenix'],
		refs: [],
		observation: {
			en: 'Eight hours on a Saturday, introducing functional programming to JavaScript developers who had not asked for it.',
			pl: 'Osiem sobotnich godzin wprowadzania programistów JavaScriptu w programowanie funkcyjne, o które nie prosili.',
		},
	},
	{
		object: 'Advent of Code, 2025',
		begin: 2025,
		end: 2025,
		medium: 'puzzle',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: false,
		again: true,
		moving: false,
		tags: ['OCaml'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/aoc2025' }],
		observation: {
			en: 'The beloved December ritual, OCaml edition.',
			pl: 'Ulubiony grudniowy rytuał, edycja OCaml.',
		},
	},
	{
		object: 'Advent of Code, 2024',
		begin: 2024,
		end: 2024,
		medium: 'puzzle',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: false,
		again: true,
		moving: false,
		tags: ['Clojure'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/aoc2024' }],
		observation: {
			en: 'The beloved December ritual, Clojure edition.',
			pl: 'Ulubiony grudniowy rytuał, edycja Clojure.',
		},
	},
	{
		object: 'Advent of Code, 2022',
		begin: 2022,
		end: 2022,
		medium: 'puzzle',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: false,
		again: true,
		moving: false,
		tags: ['Elixir'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/aoc2022' }],
		observation: {
			en: 'The beloved December ritual, Elixir edition.',
			pl: 'Ulubiony grudniowy rytuał, edycja Elixir.',
		},
	},
	{
		object: 'Advent of Code, 2020',
		begin: 2020,
		end: 2020,
		medium: 'puzzle',
		state: 'fin',
		magnitude: 'days',
		published: true,
		used: false,
		again: true,
		moving: false,
		tags: ['Elixir'],
		refs: [{ label: 'git', href: 'https://github.com/zanlib0/aoc2020' }],
		observation: {
			en: 'The beloved December ritual, Elixir edition.',
			pl: 'Ulubiony grudniowy rytuał, edycja Elixir.',
		},
	},
];
