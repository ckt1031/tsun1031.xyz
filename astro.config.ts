import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import mailObfuscation from 'astro-mail-obfuscation';
import robotsTxt from 'astro-robots-txt';
import { serializeSitemapItem } from './src/utils/sitemap';

const SITE_URL = 'https://tsun1031.xyz';

const vercelAdapter = vercel({
	imageService: true,
	staticHeaders: true,
	devImageService: 'sharp',
	webAnalytics: {
		enabled: true,
	},
});

export default defineConfig({
	site: 'https://tsun1031.xyz',
	trailingSlash: 'never',
	prefetch: true,
	adapter: process.env.VERCEL === '1' ? vercelAdapter : undefined,
	integrations: [
		mailObfuscation(),
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
		breakpoints: [640, 800],
		domains: ['obs-cdn.tsun1031.xyz'],
		responsiveStyles: true,
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
		processor: satteri({
			features: { directive: true },
		}),
	},
	vite: {
		optimizeDeps: {
			exclude: ['medium-zoom'],
		},
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'DM Sans',
			cssVariable: '--font-dm-sans',
			weights: [400, 600, 700, 800],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-ibm-plex-mono',
			weights: [400, 600, 700, 800],
		},
	],
	experimental: {
		incrementalBuild: true,
	},
});
