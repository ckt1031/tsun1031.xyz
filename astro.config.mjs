import mdx from '@astrojs/mdx';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, sharpImageService } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkParse from 'remark-parse';

import { headers } from './src/custom-http-headers.mjs';

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
    react({
      experimentalReactChildren: true,
    }),
    sitemap(),
    mdx(),
    prefetch(),
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
  image: {
    service: sharpImageService(),
  },
  vite: {
    plugins: [
      ...(process.env.SENTRY_AUTH_TOKEN
        ? sentryVitePlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,

            // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
            // and need `project:releases` and `org:read` scopes
            authToken: process.env.SENTRY_AUTH_TOKEN,
          })
        : []),
    ],
    build: {
      sourcemap: true,
    },
  },
  server: {
    headers,
  },
});
