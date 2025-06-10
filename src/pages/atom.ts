import { generateFeed } from './rss';

export async function GET(context: { site: string | URL }) {
	const feed = await generateFeed(context);

	return new Response(feed.atom1(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
}
