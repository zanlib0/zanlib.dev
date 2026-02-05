import { getCollection } from "astro:content";

import type { Language, Post } from './types'

type Options = {
	includeWip: boolean;
};

export const collectPosts = async (language: Language = 'en', opts: Options = { includeWip: false }): Promise<Post[]> => {
	const articles = (await getCollection('articles'))
	const notes = (await getCollection('notes'))
	const jots = (await getCollection('jots'))

	const sorted = [...articles, ...notes, ...jots].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

	const posts = sorted
		.map(post => {
			const [lang, ...slug] = post.id.split('/');
			return { ...post, lang: lang as Language, id: slug.join('/') };
		})
		.filter((post) => {
      if (!opts.includeWip && post.data.wip) return false;
			return post.lang === language
		})

	return posts
}

export async function postExistsInLanguage(
	slug: string,
	language: Language
): Promise<boolean> {
	const posts = await collectPosts(language);
	return posts.some(post => post.id === slug);
}
