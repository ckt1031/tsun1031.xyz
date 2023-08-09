import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig, sharpImageService } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkParse from 'remark-parse';

export default defineConfig({
  site: 'https://ckt1031.xyz',
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [
        rehypeExternalLinks,
        {
          rel: ['nofollow'],
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
    remarkPlugins: [
      remarkGfm,
      remarkNormalizeHeadings,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      remarkParse,
    ],
  },
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
    robotsTxt({
      sitemap: ['https://ckt1031.xyz/sitemap-index.xml'],
      policy: [
        {
          userAgent: '*',
          disallow: ['/404', '/api'],
        },
        {
          userAgent: '*',
          allow: ['/'],
        },
      ],
    }),
  ],
  experimental: {
    assets: true,
  },
  image: {
    service: sharpImageService(),
  },
});
