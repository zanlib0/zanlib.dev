import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const languageSchema = z.union([z.literal('en'), z.literal('pl')])

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			language: languageSchema,
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
		}),
});

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		title: z.string(),
		langauge: languageSchema,
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	})
})

const jots = defineCollection({
	loader: glob({ base: './src/content/jots', pattern: '**/*.{md}' }),
	schema: () => z.object({
		langauge: languageSchema,
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	})
})

export const collections = { articles, notes, jots };
