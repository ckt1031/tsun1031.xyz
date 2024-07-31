import { getCollection } from 'astro:content';
import { Feed } from 'feed';

import config from '@/config';

export async function GET(context: { site: string | URL }) {
	const posts = await getCollection('posts');

	const url =
		typeof context.site === 'string' ? context.site : context.site.href;

	const feed = new Feed({
		title: config.siteTitle,
		description: config.description,
		id: url,
		link: url,
		copyright: `All rights reserved ${new Date().getFullYear()}, ${config.siteTitle}`,
	});

	for (const post of posts) {
		feed.addItem({
			title: post.data.title,
			id: `${url}posts/${post.slug}`,
			link: `${url}posts/${post.slug}`,
			description: post.data.description,
			content: post.data.description,
			date: post.data.published,
		});
	}

	return new Response(feed.atom1(), {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
}
