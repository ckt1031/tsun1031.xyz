import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, passthroughImageService } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { getUserAgents } from './src/user-agents';

const normalUA = await getUserAgents('https://www.ditig.com/robots.txt');
const aiCrawlerUA = await getUserAgents(
	'https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/refs/heads/main/robots.txt',
);

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
				...normalUA.map((ua) => ({
					userAgent: ua,
					allow: ['/'],
				})),
				...aiCrawlerUA.map((ua) => ({
					userAgent: ua,
					disallow: ['/'],
				})),
			],
		}),
		(await import('@playform/compress')).default(),
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
