// @ts-check

import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { marginnoteHandlers, remarkMarginnotesPlugin } from 'remark-marginnotes';

// https://astro.build/config
export default defineConfig({
	site: 'https://zanlib.dev',
	// Astro v7 changed the default to 'jsx', which strips (rather than collapses)
	// the newline between adjacent inline elements — e.g. `zanlib` + <Dot />.
	compressHTML: true,
	integrations: [mdx(), sitemap()],
	markdown: {
		processor: unified({
			remarkPlugins: [
				[remarkMarginnotesPlugin, {}]
			],
			remarkRehype: { handlers: marginnoteHandlers({ label: 'numbers' })},
		}),
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
		'/github': 'https://github.com/zanlib0',
		'/x': 'https://x.com/zanlib0',
		'/twitter': 'https://x.com/zanlib0',
		'/linkedin': 'https://www.linkedin.com/in/marek-chotoborski-1b5562153',
	}
});
