import { type CollectionEntry, getCollection } from 'astro:content';

export function isPublishedPost(post: CollectionEntry<'posts'>) {
	return !post.data.draft;
}

export function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
	return getCollection('posts', isPublishedPost);
}

export function sortPostsByPublishedDate(posts: CollectionEntry<'posts'>[]) {
	return posts.sort(
		(a, b) => b.data.published.getTime() - a.data.published.getTime(),
	);
}

export function getPostModifiedDate(data: CollectionEntry<'posts'>['data']) {
	const { modified, published } = data;

	return modified && modified.getTime() !== published.getTime()
		? modified
		: undefined;
}
