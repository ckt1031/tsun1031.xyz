<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <html>
      <head>
        <title>ckt RSS</title>
        <style type="text/css">
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
      }
      .feed {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .title {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
      }
      .url {
        font-size: 14px;
        color: #666;
      }
      .item {
        margin-bottom: 20px;
      }
      .item:last-child {
        margin-bottom: 0;
      }
      .item-title {
        font-size: 20px;
        color: #333;
      }
      .link {
        color: #0066cc;
        text-decoration: none;
      }
      .description {
        font-size: 14px;
        color: #666;
      }
        </style>
      </head>
      <body>
        <div class="feed">
          <div class="header">
            <div class="title">ckt RSS</div>
            <div class="url">
              <xsl:value-of select="rss/channel/link"/>
            </div>
          </div>
          <xsl:for-each select="rss/channel/item">
            <div class="item">
              <div class="item-title">
                <xsl:value-of select="title"/>
              </div>
              <a class="link" href="{link}">
                <xsl:value-of select="link"/>
              </a>
              <div class="description">
                <xsl:value-of select="description"/>
              </div>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>