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

import { serializeSitemapItem } from './src/utils/sitemap';

const SITE_URL = 'https://tsun1031.xyz';

export default defineConfig({
	site: 'https://tsun1031.xyz',
	trailingSlash: 'never',
	integrations: [
		icon(),
		sitemap({
			changefreq: 'weekly',
			filter: (page) =>
				!['/about', '/contact'].includes(new URL(page).pathname),
			priority: 0.8,
			serialize: serializeSitemapItem,
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
		domains: ['obs-cdn.tsun1031.xyz'],
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-ibm-plex-sans',
			weights: [400, 600, 700, 800],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-ibm-plex-mono',
			weights: [400, 600, 700, 800],
		},
	],
});
