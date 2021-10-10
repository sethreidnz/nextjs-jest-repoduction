import fs from 'fs';
import path from 'path';

// local imports
import { Article } from 'src/models';
import { frontmatter } from 'src/utility/server/articles';
import { ARTICLE_METADATA_SCHEMA } from 'src/constants/revalidatorSchemas';
import {
  convertFrontmatterToMetadata,
  formatErrorAsString,
} from './frontmatter';

/**
 * The root path of the article files
 */
const ARTICLES_PATH = path.join(process.cwd(), 'articles');

/**
 * Generates an article from an mdx file based on it's slug using the pattern of `${slug}.mdx`. Will throw an error
 * if there are any issues processing the file, it's or its frontmatter metadata. Optionally pass in the base
 *
 * @param slug - the slug of the article
 * @param articlesPath - (optional) the path of the folder that contains the mdx article files
 */
export const generateArticle = (
  slug: string,
  articlesPath = ARTICLES_PATH
): Article => {
  const filePath = path.join(articlesPath, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Cannot find article using slug '${slug}' using filepath '${filePath}'`
    );
  }

  const source = fs.readFileSync(filePath);
  const { content, data, errors } = frontmatter(
    source.toString(),
    filePath,
    ARTICLE_METADATA_SCHEMA
  );

  if (errors && errors.length) {
    const errorMessage = `Error processing frontmatter metadata for article with slug '${slug}' at filepath '${filePath}': 
      ${errors.map(
        (error, index) =>
          `\n\n Error ${index + 1}: ${formatErrorAsString(error)}`
      )}`;
    throw new Error(errorMessage);
  }

  return {
    content,
    metadata: convertFrontmatterToMetadata(data, slug),
    filePath,
  };
};

/**
 * Generates an array of Articles from mdx files on disk. Optionally pass in the path of these files.
 *
 * @param articlesPath - (optional) the path of the folder that contains the mdx article files
 */
export const generateArticles = (articlesPath = ARTICLES_PATH): Article[] => {
  const articlesFilePaths = fs
    .readdirSync(articlesPath)
    .filter((path) => /\.mdx?$/.test(path));
  const articles = articlesFilePaths.map((filePath) => {
    const slug = path.basename(filePath).replace(/\.mdx?$/, '');
    return generateArticle(slug, articlesPath);
  });
  return articles;
};

export const ARTICLES = generateArticles();
