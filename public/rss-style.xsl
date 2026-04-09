<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>RSS Feed for <xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"/>
      </head>
      <body class="bg-neutral-100 dark:bg-neutral-900 text-slate-900 dark:text-slate-200 antialiased min-h-screen">

        <header class="bg-neutral-900 dark:bg-neutral-950 border-b border-neutral-800">
          <div class="max-w-2xl mx-auto px-6 py-10">
            <span class="inline-flex items-center text-xs text-neutral-400 bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-4">
              RSS Feed
            </span>
            <h1 class="text-2xl font-bold text-neutral-100 mb-1">
              <xsl:value-of select="/rss/channel/title"/>
            </h1>
            <p class="text-neutral-400 text-sm">
              <xsl:value-of select="/rss/channel/description"/>
            </p>
            <div class="mt-4 flex gap-4 text-xs text-neutral-500">
              <a class="text-neutral-400 hover:text-neutral-200 transition-colors">
                <xsl:attribute name="href"><xsl:value-of select="/rss/channel/link"/></xsl:attribute>
                &#x2192; Visit site
              </a>
              <span><xsl:value-of select="count(/rss/channel/item)"/> posts</span>
            </div>
          </div>
        </header>

        <main class="max-w-2xl mx-auto px-6 py-8">
          <p class="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Latest Posts</p>
          <div class="flex flex-col gap-3">
            <xsl:for-each select="/rss/channel/item">
              <article class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-5 py-4 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors">
                <h2 class="font-semibold text-sm mb-1">
                  <a class="hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors">
                    <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <xsl:if test="description">
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-2">
                    <xsl:value-of select="description"/>
                  </p>
                </xsl:if>
                <xsl:if test="pubDate">
                  <time class="text-xs text-neutral-400 dark:text-neutral-500">
                    <xsl:value-of select="pubDate"/>
                  </time>
                </xsl:if>
              </article>
            </xsl:for-each>
          </div>
        </main>

        <footer class="max-w-2xl mx-auto px-6 py-6 text-center text-xs text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
          Copy the page URL into your RSS reader to subscribe.
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
