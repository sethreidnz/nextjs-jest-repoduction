import { MdxRemote } from 'next-mdx-remote/types';

//local imports
import { ArticleMetadata } from 'src/models';

/**
 * The main article model for the website
 */
export type Article = {
  content: string;
  metadata: ArticleMetadata;
  filePath: string;
};

/**
 * An Article with the MdxRemote.Source result from running `renderToString()` from the
 * package `next-mdx-remote`
 */
export type ArticleWithSource = Article & {
  source: MdxRemote.Source;
};
