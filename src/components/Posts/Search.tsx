import { useMemo } from 'react';

import type { CollectionEntry } from 'astro:content';
import Fuse from 'fuse.js';

import TablerSearch from '~icons/tabler/search';

interface Props {
  posts: CollectionEntry<'posts'>[];
  orginalPosts: CollectionEntry<'posts'>[];
  setPosts: React.Dispatch<React.SetStateAction<CollectionEntry<'posts'>[]>>;
}

export default function Search({ posts, orginalPosts, setPosts }: Props) {
  const fuse = useMemo(() => {
    return new Fuse(orginalPosts, {
      keys: ['id', 'data.title', 'body', 'data.description'],
      threshold: 0.2,
    });
  }, [posts]);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value || value.length === 0) setPosts(orginalPosts);
    else {
      const result = fuse.search(value);
      setPosts(result.map(({ item }) => item));
    }
  };

  return (
    <div className="base-border mb-2 mt-3 flex flex-row items-center space-x-3 rounded-md border bg-gray-100 px-3 py-1 dark:bg-gray-800">
      <TablerSearch className="h-[22] w-[22]" />
      <input
        placeholder="Search"
        onChange={onSearch}
        className="w-full bg-transparent p-1 outline-none"
      />
    </div>
  );
}
