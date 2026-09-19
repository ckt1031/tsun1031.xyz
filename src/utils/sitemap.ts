import { readdir, readFile } from 'node:fs/promises';
import { extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { SitemapItem } from '@astrojs/sitemap';

import { parseHongKongDate } from './date';

const POSTS_DIRECTORY = fileURLToPath(
	new URL('../content/posts/', import.meta.url),
);

async function getMarkdownFiles(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const path = `${directory}/${entry.name}`;

			if (entry.isDirectory()) return getMarkdownFiles(path);
			return ['.md', '.mdx'].includes(extname(entry.name)) ? [path] : [];
		}),
	);

	return files.flat();
}

function getFrontmatterDate(source: string, field: 'published' | 'updated') {
	const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
	const rawValue = frontmatter?.[1].match(
		new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm'),
	)?.[1];

	if (!rawValue) return undefined;

	const value = rawValue.replace(/^(['"])(.*)\1$/, '$2');
	return parseHongKongDate(value).toISOString();
}

async function getPostLastModifiedByPath() {
	const files = await getMarkdownFiles(POSTS_DIRECTORY);
	const entries = await Promise.all(
		files.map(async (file) => {
			const source = await readFile(file, 'utf8');
			const slug = relative(POSTS_DIRECTORY, file).replace(/\.(md|mdx)$/, '');
			const lastModified =
				getFrontmatterDate(source, 'updated') ??
				getFrontmatterDate(source, 'published');

			return [`/posts/${slug}`, lastModified] as const;
		}),
	);

	return new Map<string, string>(
		entries.flatMap(([path, lastModified]) =>
			lastModified ? [[path, lastModified]] : [],
		),
	);
}

const postLastModifiedByPath = getPostLastModifiedByPath();

export async function serializeSitemapItem(
	item: SitemapItem,
): Promise<SitemapItem> {
	const { pathname } = new URL(item.url);
	const lastmod = (await postLastModifiedByPath).get(pathname);

	if (lastmod) item.lastmod = lastmod;

	if (pathname === '/') {
		item.priority = 1;
	} else if (pathname === '/posts') {
		item.priority = 0.9;
	} else if (pathname.startsWith('/posts/tags/')) {
		item.priority = 0.5;
	}

	return item;
}
