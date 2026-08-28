import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			pubDate: z.date(),
			updatedDate: z.date().optional(),
			wip: z.boolean().optional().default(false),
		}),
});

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		title: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		wip: z.boolean().optional().default(false),
	})
})

const jots = defineCollection({
	loader: glob({ base: './src/content/jots', pattern: '**/*.md' }),
	schema: () => z.object({
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		wip: z.boolean().optional().default(false),
	})
})

export const collections = { articles, notes, jots };
