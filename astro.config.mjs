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
			prefixDefaultLocale: true,
		}
	},
	redirects: {
		'/': '/en',
	}
});
