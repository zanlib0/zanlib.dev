// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { marginnoteHandlers, remarkMarginnotesPlugin } from 'remark-marginnotes';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [
			[remarkMarginnotesPlugin, {}]
		],
		remarkRehype: { handlers: marginnoteHandlers({ label: 'numbers' })},
		shikiConfig: {
			theme: 'github-dark-default',
		}
	},
	i18n: {
		locales: ["en", "pl"],
		defaultLocale: "en",
		routing: {
			prefixDefaultLocale: false,
		}
	},
	redirects: {
		'/en': '/',
		'/en/blog': '/blog',
		'/en/blog/*': '/blog/*',
		'/github': 'https://github.com/zanlib0',
		'/x': 'https://x.com/zanlib0',
		'/twitter': 'https://x.com/zanlib0',
		'/linkedin': 'https://www.linkedin.com/in/marek-chotoborski-1b5562153',
	}
});
