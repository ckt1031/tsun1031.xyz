import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parseHongKongDate } from './utils/date';

function hongKongDateSchema(fieldName: string) {
	return z.union([z.string(), z.date()]).transform((value, ctx) => {
		if (value instanceof Date) return value;

		try {
			return parseHongKongDate(value);
		} catch {
			ctx.addIssue({
				code: 'custom',
				message: `${fieldName} must be a valid Hong Kong date`,
			});
			return z.NEVER;
		}
	});
}

const posts = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		published: hongKongDateSchema('published'),
		updated: hongKongDateSchema('updated').optional(),
		canonical: z
			.url()
			.refine(
				(value) => ['http:', 'https:'].includes(new URL(value).protocol),
				{
					message: 'canonical must be an HTTP(S) URL',
				},
			)
			.optional(),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { posts };
