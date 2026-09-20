import type { APIRoute } from 'astro';

import { renderHomeOpenGraphImage } from '@/utils/open-graph';

export const GET = (async () => {
	return new Response(await renderHomeOpenGraphImage(), {
		headers: {
			'Content-Type': 'image/jpeg',
		},
	});
}) satisfies APIRoute;
