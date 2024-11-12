import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
	site: 'https://tsun1031.xyz',
	build: {
		assets: 'assets',
	},
	integrations: [
		icon(),
		tailwind(),
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
					userAgent: '*',
					disallow: ['/404', '/api'],
				},
				{
					userAgent: '*',
					allow: ['/'],
				},
			],
		}),
		(await import('@playform/compress')).default(),
	],
	image: {
		service: passthroughImageService(),
		domains: ['obsidian-img.tsun1031.xyz'],
	},
});
