import type { CollectionEntry } from 'astro:content';

export type Language = 'pl' | 'en';

export type Post =
	| (CollectionEntry<'articles'> & { lang: Language })
	| (CollectionEntry<'notes'> & { lang: Language })
	| (CollectionEntry<'jots'> & { lang: Language });
