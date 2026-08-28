import rss from '@astrojs/rss';
import { RSS_LOCALES, getSiteMetadata } from '../../consts';
import { collectPosts } from '../../utils/collectPosts';

export async function GET(context) {
	const posts = await collectPosts('pl');
	const siteMetadata = getSiteMetadata('pl');

	return rss({
		title: siteMetadata.title,
		description: siteMetadata.description,
		site: context.site,
		customData: `<language>${RSS_LOCALES.pl}</language>`,
		items: posts.map((post) => ({
			title: post.data.title || '',
			description: post.data.description || '',
			pubDate: post.data.pubDate,
			link: `/pl/blog/${post.id}/`,
		})),
	});
}
