import { type CollectionEntry, getCollection } from 'astro:content';

export function isPublishedPost(post: CollectionEntry<'posts'>) {
	return !post.data.draft;
}

export function getPublishedPosts() {
	return getCollection('posts', isPublishedPost);
}

export function sortPostsByPublishedDate(posts: CollectionEntry<'posts'>[]) {
	return posts.sort(
		(a, b) => b.data.published.getTime() - a.data.published.getTime(),
	);
}
