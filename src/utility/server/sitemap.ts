import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import globby from 'globby';

// local imports
import { Article } from 'src/models';
import { DEPLOY_URL } from 'src/constants';
import { getPageUrl } from '../urls';

export const generateSitemapString = async (
  articles: Article[]
): Promise<string> => {
  const pagePaths = await globby([
    'src/pages/**/*.tsx', // All routes inside src/pages
    '!src/pages/**/[*.{ts,tsx}', // Exclude dynamic routes since they are handled below
    '!src/pages/generate/**/*', // Exclude routes used to generate files
    '!src/pages/_*.{ts,tsx}', // Ignore next.js _app and _document files
    '!src/pages/api/**/*', // Ignore API routes
  ]);
  const pageFilePaths = pagePaths.map((page) => {
    const path = page
      .replace('src/pages', '') // remove the pages string
      .replace(/(.tsx|.ts)/, '') // remove the file extension
      .replace('/index', ''); // remove /index

    return {
      url: path,
      changefreq: 'daily',
      priority: 0.5,
    };
  });
  const articleLinks = articles.map((article) => ({
    url: getPageUrl(article.metadata.path, article.metadata.pageType, true),
    changefreq: 'daily',
    priority: 0.8,
  }));
  const siteLinks = [...pageFilePaths, ...articleLinks];
  const stream = new SitemapStream({ hostname: DEPLOY_URL });
  const sitemap = await streamToPromise(Readable.from(siteLinks).pipe(stream));
  return sitemap.toString();
};
