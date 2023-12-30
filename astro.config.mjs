import mdx from '@astrojs/mdx';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, squooshImageService } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkParse from 'remark-parse';

export default defineConfig({
	site: 'https://ckt1031.xyz',
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			rehypeCodeTitles,
			[
				rehypeExternalLinks,
				{
					rel: ['nofollow'],
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['anchor'],
					},
				},
			],
		],
		remarkPlugins: [remarkGfm, remarkNormalizeHeadings, remarkParse],
	},
	integrations: [
		icon(),
		tailwind(),
		sitemap(),
		mdx(),
		prefetch(),
		robotsTxt({
			sitemap: ['https://ckt1031.xyz/sitemap-index.xml'],
			policy: [
				{
					userAgent: '*',
					disallow: ['/404', '/api'],
				},
				{
					userAgent: '*',
					allow: ['/'],
				},
			],
		}),
	],
	image: {
		service: squooshImageService(),
		remotePatterns: [{ protocol: 'https' }],
	},
});
