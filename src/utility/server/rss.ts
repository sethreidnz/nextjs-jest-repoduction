import renderToString from 'next-mdx-remote/render-to-string';
import { mdxComponents } from 'src/components/mdx';

// local imports
import { DEFAULT_SEO } from 'src/constants/seo';
import { Article } from 'src/models';
import { getPageUrl } from 'src/utility';

const generateBlogPostRssXml = async (
  articles: Article[]
): Promise<{ rssItemsXml: string; latestPostDate: Date }> => {
  let latestPublishDate: Date | undefined = undefined;
  let rssItemsXml = '';
  for (const article of articles) {
    const lastUpdatedDate = new Date(
      article.metadata.updatedAt
        ? article.metadata.updatedAt
        : article.metadata.publishedAt
    );
    const canonicalUrl = getPageUrl(
      article.metadata.path,
      article.metadata.pageType
    );
    const publishedDate = new Date(article.metadata.publishedAt).toUTCString();
    const mdxSource = await renderToString(article.content, {
      components: mdxComponents,
      scope: article.metadata,
    });
    if (!latestPublishDate || lastUpdatedDate > latestPublishDate) {
      latestPublishDate = lastUpdatedDate;
    }
    rssItemsXml += `
        <item>
            <title>${article.metadata.title}</title>
            <guid isPermaLink="true">${canonicalUrl}</guid>
            <link>${canonicalUrl}</link>
            <pubDate>${publishedDate}</pubDate>
            <description>
              <![CDATA[${article.metadata.description}]]>
            </description>
            <content:encoded>
              <![CDATA[${mdxSource.renderedOutput}]]>
            </content:encoded>
        </item>`;
  }
  return {
    rssItemsXml,
    latestPostDate: latestPublishDate!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  };
};

export const generateSiteRssString = async (
  articles: Article[]
): Promise<string> => {
  const { rssItemsXml, latestPostDate } = await generateBlogPostRssXml(
    articles
  );
  return `<?xml version="1.0" ?>
    <rss
      version="2.0"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
      xmlns:atom="http://www.w3.org/2005/Atom"
    >
      <channel>
          <title>${DEFAULT_SEO.title}</title>
          <link>${DEFAULT_SEO.url}</link>
          <atom:link href="${
            DEFAULT_SEO.url
          }/rss.xml" rel="self" type="application/rss+xml" />
          <description>${DEFAULT_SEO.description}</description>
          <language>en</language>
          <lastBuildDate>${latestPostDate.toUTCString()}</lastBuildDate>
          <image>
            <url>${DEFAULT_SEO.image}</url>
            <title>${DEFAULT_SEO.title}</title>
            <link>${DEFAULT_SEO.url}</link>
            <width>32</width>
            <height>32</height>
          </image>
          ${rssItemsXml}
      </channel>
    </rss>`;
};
