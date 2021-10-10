import { define, extend } from 'cooky-cutter';

// local imports
import {
  articleMetadata,
  articleMetadataWithNoTopics,
  articleMetadataWithUpdatedDate,
} from './articleMetadata';
import { Article } from 'src/models';

export const article = define<Article>({
  content: (i: number) => `Test article content #${i}`,
  metadata: articleMetadata,
  filePath: (i: number) => `/test/article-${i}`,
});

export const articleWithUpdatedDate = extend<Article, Article>(article, {
  metadata: articleMetadataWithUpdatedDate,
});

export const articleItemWithNoTopics = extend<Article, Article>(article, {
  metadata: articleMetadataWithNoTopics,
});
