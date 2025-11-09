import { getCollection } from "astro:content";

import type { Language, Post } from './types'

export const collectPosts = async (language: Language = 'en'): Promise<Post[]> => {
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
			return post.lang === language
		})

	return posts
}
