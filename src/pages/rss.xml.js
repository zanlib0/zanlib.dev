import rss from '@astrojs/rss';
import { getSiteMetadata } from '../consts';
import { collectPosts } from '../utils/collectPosts';

export async function GET(context) {
	const posts = await collectPosts('en');
	const siteMetadata = getSiteMetadata('en');

	return rss({
		title: siteMetadata.title,
		description: siteMetadata.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title || '',
			description: post.data.description || '',
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
	});
}
