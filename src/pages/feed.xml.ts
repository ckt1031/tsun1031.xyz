import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const parser = new MarkdownIt();

import config from '@/config';

export async function get(context) {
  const posts = await getCollection('posts');

  return rss({
    // `<title>` field in output xml
    title: config.siteTitle,
    // `<description>` field in output xml
    description: config.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.published,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
      link: `/posts/${post.slug}/`,
    })),
    stylesheet: '/rss.xsl',
  });
}
