import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parseHongKongDate } from './utils/date';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		published: z.string().transform(parseHongKongDate),
		updated: z.string().transform(parseHongKongDate).optional(),
		canonical: z.url().optional(),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { posts };
