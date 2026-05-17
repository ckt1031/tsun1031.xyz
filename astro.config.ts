import {
	existsSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
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
import { formatHongKongISOString, parseHongKongDate } from './src/utils/date';

const SITE_URL = 'https://tsun1031.xyz';
const POST_DIR = join(process.cwd(), 'src/content/posts');

function getUpdatedDate(content: string) {
	const frontmatter = content.match(/^---\s*\n([\s\S]*?)\n---/);
	const dateValue = frontmatter?.[1].match(/^updated:\s*(.+)$/m)?.[1];

	if (!dateValue) return;

	return formatHongKongISOString(parseHongKongDate(dateValue));
}

function getPostLastmodByPath(dir = POST_DIR) {
	const lastmodByPath = new Map<string, string>();

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);

		if (entry.isDirectory()) {
			for (const [url, lastmod] of getPostLastmodByPath(path)) {
				lastmodByPath.set(url, lastmod);
			}
			continue;
		}

		if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx')) continue;

		const slug = relative(POST_DIR, path)
			.replace(/\.(md|mdx)$/, '')
			.split(sep)
			.join('/');
		const content = readFileSync(path, 'utf-8');
		const frontmatterUpdated = getUpdatedDate(content);

		lastmodByPath.set(
			`/posts/${slug}`,
			frontmatterUpdated ?? formatHongKongISOString(statSync(path).mtime),
		);
	}

	return lastmodByPath;
}

const postLastmodByPath = getPostLastmodByPath();

function escapeRegExp(value: string) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function localizeSitemapLastmod() {
	return {
		name: 'localize-sitemap-lastmod',
		hooks: {
			'astro:build:done': ({ dir }: { dir: URL }) => {
				const sitemapPath = join(fileURLToPath(dir), 'sitemap-0.xml');

				if (!existsSync(sitemapPath)) return;

				let sitemap = readFileSync(sitemapPath, 'utf-8');

				for (const [path, lastmod] of postLastmodByPath) {
					const loc = `<loc>${SITE_URL}${path}</loc>`;
					const pattern = new RegExp(
						`(${escapeRegExp(loc)}<lastmod>)[^<]+(</lastmod>)`,
					);
					sitemap = sitemap.replace(pattern, `$1${lastmod}$2`);
				}

				writeFileSync(sitemapPath, sitemap);
			},
		},
	};
}

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

				if (postLastmodByPath.has(pathname)) {
					item.lastmod = postLastmodByPath.get(pathname);
				}

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
		localizeSitemapLastmod(),
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
