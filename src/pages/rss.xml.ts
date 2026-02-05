import { loadRenderers } from 'astro:container';
import { getCollection, render } from 'astro:content';
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import rss, { type RSSFeedItem } from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import config from '@/config';

export async function GET(context: { site: string | URL }) {
	const posts = await getCollection('posts');

	const renderers = await loadRenderers([getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });

	const items: RSSFeedItem[] = [];

	// Sort posts by published date and limit to 25
	const sortedPosts = posts
		.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())
		.slice(0, 25);

	for (const post of sortedPosts) {
		const { Content } = await render(post);
		const content = await container.renderToString(Content);

		items.push({
			title: post.data.title,
			pubDate: post.data.published,
			description: post.data.description,
			content,
			link: `/posts/${post.id}`,
		});
	}

	return rss({
		// `<title>` field in output xml
		title: config.siteTitle,
		// `<description>` field in output xml
		description: config.description,
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#site
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items,
	});
}
