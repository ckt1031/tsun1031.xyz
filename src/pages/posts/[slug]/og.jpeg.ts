import type { APIRoute, InferGetStaticPropsType } from 'astro';

import { renderPostOpenGraphImage } from '@/utils/open-graph';
import { getPublishedPosts } from '@/utils/posts';

export async function getStaticPaths() {
	const posts = await getPublishedPosts();

	return posts
		.filter((post) => !post.data.ogImage)
		.map((post) => ({
			params: { slug: post.id },
			props: { post },
		}));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET = (async ({ props }) => {
	const { post } = props as Props;

	return new Response(await renderPostOpenGraphImage(post), {
		headers: {
			'Content-Type': 'image/jpeg',
		},
	});
}) satisfies APIRoute;
