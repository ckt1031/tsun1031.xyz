import { loadRenderers } from 'astro:container';
import { getCollection, render } from 'astro:content';
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { Feed } from 'feed';
import config from '@/config';

export async function generateFeed(context: { site: string | URL }) {
	const renderers = await loadRenderers([getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });
	const posts = await getCollection('posts');

	const site = context.site;
	const url = typeof site === 'string' ? site : site.href;

	const feed = new Feed({
		title: config.siteTitle,
		description: config.description,
		id: url,
		link: url,
		copyright: `All rights reserved ${new Date().getFullYear()}, ${config.siteTitle}`,
	});

	for (const post of posts
		.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())
		// Limit to 25 posts
		.slice(0, 25)) {
		const { Content } = await render(post);
		const content = await container.renderToString(Content);

		feed.addItem({
			title: post.data.title,
			id: `${url}posts/${post.slug}`,
			link: `${url}posts/${post.slug}`,
			description: post.data.description,
			content,
			date: post.data.published,
		});
	}

	return feed;
}

export async function GET(context: { site: string | URL }) {
	const feed = await generateFeed(context);

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
}
