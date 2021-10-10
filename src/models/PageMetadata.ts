import { PageType } from 'src/enums';

/**
 * The base metadata that is required on each page (a regular page or an article)
 */
export type PageMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  image: string;
  updatedAt?: string;
  slug: string;
  path: string;
  pageType: PageType;
};
