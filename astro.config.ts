import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {
	defineConfig,
	fontProviders,
	passthroughImageService,
} from 'astro/config';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';

const SITE_URL = 'https://tsun1031.xyz';

export default defineConfig({
	site: 'https://tsun1031.xyz',
	trailingSlash: 'never',
	integrations: [
		icon(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.8,
			lastmod: new Date(),
		}),
		mdx(),
		robotsTxt({
			sitemap: [`${SITE_URL}/sitemap-index.xml`],
			policy: [
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
	vite: {
		// @ts-expect-error
		plugins: [tailwindcss()],
	},
	experimental: {
		clientPrerender: true,
		fonts: [
			{
				provider: fontProviders.google(),
				name: 'Inter',
				cssVariable: '--font-inter',
			},
		],
	},
});
