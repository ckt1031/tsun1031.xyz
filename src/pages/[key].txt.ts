import type { APIRoute, GetStaticPaths } from 'astro';

const key = String(import.meta.env.INDEXNOW_KEY ?? '');
const keyFormat = /^[A-Za-z0-9-]{8,128}$/;

export const getStaticPaths = (() => {
	if (!key) return [];

	if (!keyFormat.test(key)) {
		throw new Error(
			'INDEXNOW_KEY must contain 8-128 letters, numbers, or hyphens',
		);
	}

	return [{ params: { key } }];
}) satisfies GetStaticPaths;

export const GET = (({ params }) =>
	new Response(params.key, {
		headers: {
			'Cache-Control': 'public, max-age=0, must-revalidate',
			'Content-Type': 'text/plain; charset=utf-8',
		},
	})) satisfies APIRoute;
