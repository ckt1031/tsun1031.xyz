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
			serialize(item) {
				const { pathname } = new URL(item.url);

				if (pathname === '/') {
					item.priority = 1;
				} else if (pathname === '/about' || pathname === '/posts') {
					item.priority = 0.9;
				} else if (pathname.startsWith('/posts/tags/')) {
					item.priority = 0.5;
				}

				return item;
			},
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
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
		},
	],
});
