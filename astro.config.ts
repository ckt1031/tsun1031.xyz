import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { shield } from '@kindspells/astro-shield';
import playformCompress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';
import {
	defineConfig,
	fontProviders,
	passthroughImageService,
} from 'astro/config';
import icon from 'astro-icon';
import pagefind from 'astro-pagefind';
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
			filter: (page) => page !== `${SITE_URL}/search`,
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
		pagefind(),
		playformCompress(),
		shield({}),
	],
	image: {
		service: passthroughImageService(),
		domains: ['obsidian-img.tsun1031.xyz'],
	},
	vite: {
		// @ts-expect-error
		plugins: [tailwindcss()],
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
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
