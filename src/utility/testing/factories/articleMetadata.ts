import { define, array, extend } from 'cooky-cutter';
import subMonths from 'date-fns/subMonths';

// local imports
import { PageType } from 'src/enums';
import { ArticleMetadata } from 'src/models';
import { generateDateBetween } from 'src/utility';
import { topic } from './topic';

export const articleMetadata = define<ArticleMetadata>({
  title: (i: number) => `Title ${i}`,
  description: (i: number) => `Test article description ${i}`,
  publishedAt: () =>
    generateDateBetween(
      subMonths(Date.now(), 2),
      subMonths(Date.now(), 1)
    ).toISOString(),
  image: (i: number) => `test-article-image-${i}.jpg`,
  author: (i: number) => `Test author ${i}`,
  topics: array(topic, 2),
  path: (i: number) => `/articles/test-article-${i}`,
  slug: (i: number) => `test-article-${i}`,
  pageType: () => PageType.Article,
});

export const articleMetadataWithUpdatedDate = extend<
  ArticleMetadata,
  ArticleMetadata
>(articleMetadata, {
  updatedAt: () =>
    generateDateBetween(
      subMonths(Date.now(), 1),
      new Date(Date.now())
    ).toISOString(),
});

export const articleMetadataWithNoTopics = extend<
  ArticleMetadata,
  ArticleMetadata
>(articleMetadata, {
  topics: array(topic, 0),
});
