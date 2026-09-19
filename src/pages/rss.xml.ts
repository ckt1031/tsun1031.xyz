import { loadRenderers } from 'astro:container';
import { render } from 'astro:content';
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx/container-renderer';
import rss, { type RSSFeedItem } from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import config from '@/config';
import {
	getPostModifiedDate,
	getPublishedPosts,
	sortPostsByPublishedDate,
} from '@/utils/posts';

export async function GET(context: { site: string | URL }) {
	const posts = await getPublishedPosts();

	const renderers = await loadRenderers([getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });

	const items: RSSFeedItem[] = [];

	// Keep the feed ordered by publication date and limit it to 25 posts.
	const sortedPosts = sortPostsByPublishedDate(posts).slice(0, 25);

	for (const post of sortedPosts) {
		const { Content } = await render(post);
		const content = await container.renderToString(Content);
		const modifiedDate = getPostModifiedDate(post.data);

		items.push({
			title: post.data.title,
			pubDate: post.data.published,
			...(modifiedDate
				? {
						customData: `<dcterms:modified>${modifiedDate.toISOString()}</dcterms:modified>`,
					}
				: {}),
			description: post.data.description,
			content,
			link: `/posts/${post.id}`,
		});
	}

	return rss({
		title: config.siteTitle,
		description: config.description,
		site: context.site,
		items,
		xmlns: {
			dcterms: 'http://purl.org/dc/terms/',
		},
	});
}
