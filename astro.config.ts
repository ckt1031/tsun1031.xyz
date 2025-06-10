import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
	site: 'https://tsun1031.xyz',
	integrations: [
		icon(),
		sitemap(),
		mdx(),
		robotsTxt({
			sitemap: ['https://tsun1031.xyz/sitemap-index.xml'],
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
		plugins: [tailwindcss()],
	},
});
