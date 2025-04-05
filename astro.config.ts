import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, passthroughImageService } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
	site: 'https://tsun1031.xyz',
	build: {
		assets: 'assets',
		inlineStylesheets: 'never',
	},
	integrations: [
		icon(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		}),
		mdx({
			optimize: true,
		}),
		robotsTxt({
			sitemap: ['https://tsun1031.xyz/sitemap-index.xml'],
			policy: [
				{
					disallow: ['/404'],
					userAgent: '*',
				},
				{
					allow: ['/'],
					userAgent: '*',
				},
			],
		}),
	],
	image: {
		service: passthroughImageService(),
		domains: ['obsidian-img.tsun1031.xyz'],
	},
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
