import { loadRenderers } from 'astro:container';
import { render } from 'astro:content';
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx/container-renderer';
import rss, { type RSSFeedItem } from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import config from '@/config';
import { getPublishedPosts, sortPostsByPublishedDate } from '@/utils/posts';

const stylesheet = '/rss-style.xsl';

export async function GET(context: { site: string | URL }) {
	const posts = await getPublishedPosts();

	const renderers = await loadRenderers([getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });

	const items: RSSFeedItem[] = [];

	// Sort posts by published date and limit to 25
	const sortedPosts = sortPostsByPublishedDate(posts).slice(0, 25);

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
		title: config.siteTitle,
		description: config.description,
		site: context.site,
		items,
		stylesheet,
	});
}
