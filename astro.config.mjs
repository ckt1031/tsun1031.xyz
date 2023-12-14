// import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
// import node from '@astrojs/node';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
// import vercel from '@astrojs/vercel/serverless';
import { defineConfig, squooshImageService } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkNormalizeHeadings from 'remark-normalize-headings';
import remarkParse from 'remark-parse';
import Icons from 'unplugin-icons/vite';

// const adapter = () => {
//   const buildTarget = process.env.ASTRO_BUILD_TARGET;

//   if (buildTarget === 'vercel') {
//     return vercel({
//       imageService: true,
//       webAnalytics: {
//         enabled: true,
//       },
//       speedInsights: {
//         enabled: true,
//       },
//     });
//   }

//   if (buildTarget === 'cloudflare') {
//     return cloudflare({
//       mode: 'directory',
//     });
//   }

//   return node({
//     mode: 'standalone',
//   });
// };

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
    partytown(),
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
    service: squooshImageService(),
  },
  // output: 'hybrid', // 'server',
  // adapter: adapter(),
  vite: {
    // resolve: {
    //   alias: {
    //     svgo: import.meta.env.PROD ? 'svgo/dist/svgo.browser.js' : 'svgo',
    //   },
    // },
    plugins: [
      Icons({
        compiler: 'jsx',
        jsx: 'react',
      }),
    ],
  },
});
