import { PageMetadata, Topic } from 'src/models';

/**
 * The metadata for an Article that extends from the base PageMetadata
 */
export type ArticleMetadata = {
  author: string;
  topics: Topic[];
} & PageMetadata;
