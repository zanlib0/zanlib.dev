import { glob, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseFrontmatter } from '@astrojs/markdown-remark';

const contentDirectory = fileURLToPath(new URL('../content', import.meta.url));
const contentPatterns = ['articles/**/*.{md,mdx}', 'notes/**/*.{md,mdx}', 'jots/**/*.{md,mdx}'];
const blogRootByLocale = { en: '/blog/', pl: '/pl/blog/' } as const;

type Locale = keyof typeof blogRootByLocale;

interface Post {
	pathname: string;
	locale: Locale;
	wip: boolean;
	pubDate: Date;
	lastmod: string;
}

export interface SitemapContentMetadata {
	wipPathnames: ReadonlySet<string>;
	lastmodByPathname: ReadonlyMap<string, string>;
}

const isLocale = (value: string): value is Locale => value in blogRootByLocale;

const asDate = (value: unknown, field: string, source: string): Date => {
	if (!(value instanceof Date) || Number.isNaN(value.valueOf())) {
		throw new Error(`Invalid or missing ${field} in ${source}`);
	}

	return value;
};

const latestPubDate = (posts: readonly Post[]): string | undefined => posts.length > 0
	? new Date(Math.max(...posts.map((post) => post.pubDate.valueOf()))).toISOString()
	: undefined;

async function readPost(relativePath: string): Promise<Post> {
	const source = await readFile(path.join(contentDirectory, relativePath), 'utf8');
	const { frontmatter } = parseFrontmatter(source);
	const [, locale, ...slug] = relativePath.split(path.sep);

	if (!locale || !isLocale(locale) || slug.length === 0) {
		throw new Error(`Expected ${relativePath} to sit under a locale directory`);
	}

	const pubDate = asDate(frontmatter.pubDate, 'pubDate', relativePath);
	const updatedDate = frontmatter.updatedDate === undefined
		? undefined
		: asDate(frontmatter.updatedDate, 'updatedDate', relativePath);

	return {
		pathname: `${blogRootByLocale[locale]}${slug.join('/').replace(/\.mdx?$/, '')}/`,
		locale,
		wip: frontmatter.wip === true,
		pubDate,
		lastmod: (updatedDate ?? pubDate).toISOString(),
	};
}

/**
 * Astro's sitemap serializer only sees URLs and `astro:content` is unreachable from
 * the config, so post frontmatter is read straight from disk.
 */
export async function loadSitemapContentMetadata(): Promise<SitemapContentMetadata> {
	const paths = await Array.fromAsync(glob(contentPatterns, { cwd: contentDirectory }));
	const posts = await Promise.all(paths.map(readPost));
	const published = posts.filter((post) => !post.wip);

	const blogIndexes = Object.entries(blogRootByLocale).flatMap(([locale, root]) => {
		const lastmod = latestPubDate(published.filter((post) => post.locale === locale));
		return lastmod ? [[root, lastmod] as const] : [];
	});

	return {
		wipPathnames: new Set(posts.filter((post) => post.wip).map((post) => post.pathname)),
		lastmodByPathname: new Map([
			...published.map((post) => [post.pathname, post.lastmod] as const),
			...blogIndexes,
		]),
	};
}
