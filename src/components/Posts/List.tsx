import { useState } from 'react';

import LightBox from '@components/Lightbox';
import clsx from 'clsx';
import sAgo from 's-ago';
import type { CollectionEntry } from 'astro:content';

import Search from './Search';

interface Props {
	allPosts: CollectionEntry<'posts'>[];
}

export default function List({ allPosts }: Props) {
	const [posts, setposts] = useState<CollectionEntry<'posts'>[]>(allPosts);

	return (
		<>
			<Search posts={posts} orginalPosts={allPosts} setPosts={setposts} />
			<div className="grid space-y-5 divide-y-2 divide-gray-400 dark:divide-gray-500">
				{posts.length > 0 ? (
					posts.map(({ data, slug }) => {
						return (
							<div
								className="flex w-full flex-col justify-between py-4 md:flex-row md:space-x-5"
								key={slug}
							>
								<div
									className={clsx(
										data.heroImage && 'mb-3 md:mb-0 md:max-w-[400px]',
										'flex max-h-fit flex-col justify-between break-words',
									)}
								>
									<div>
										<a
											className="cursor-pointer text-2xl font-semibold hover:underline"
											href={`/posts/${slug}`}
										>
											{data.title}
										</a>
										{data.tags && (
											<div className="my-2 flex flex-row flex-wrap gap-2">
												{data.tags.map((tag) => (
													<a
														key={tag}
														href={`/posts/tags/${tag}`}
														className="base-border rounded-lg border bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
													>
														{tag}
													</a>
												))}
											</div>
										)}
										<p className="text-gray-600 dark:text-gray-300">
											{data.description}
										</p>
									</div>
									<p className="mt-3 text-gray-500 dark:text-gray-400">
										{sAgo(new Date(data.published))}
									</p>
								</div>
								{data.heroImage && (
									<LightBox src={data.heroImage.src}>
										<img
											alt="Thumbnail"
											className="rounded-lg md:mt-0 md:rounded"
											src={data.heroImage.src}
											width={1600 * 0.2}
											height={900 * 0.2}
										/>
									</LightBox>
								)}
							</div>
						);
					})
				) : (
					<div className="flex flex-col items-center">
						<p className="p-5">Nothing can be found!</p>
					</div>
				)}
			</div>
		</>
	);
}
