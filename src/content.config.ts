import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		published: z.string().transform((val) => new Date(val)),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { posts };
