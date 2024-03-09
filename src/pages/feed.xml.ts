import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

import config from '@/config';

export async function GET(context: { site: string | URL }) {
	const posts = await getCollection('posts');

	return rss({
		// `<title>` field in output xml
		title: config.siteTitle,
		// `<description>` field in output xml
		description: config.description,
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.published,
			description: post.data.description,
			link: `/posts/${post.slug}/`,
		})),
	});
}
