import fs from 'fs';
import path from 'path';

/**
 * The root path of the mdx article files
 */
const ARTICLE_FOLDER_PATH = path.join(process.cwd(), 'articles');

/**
 * The file paths of all the mdx articles
 */
export const ARTICLE_FILES_PATHS = fs
  .readdirSync(ARTICLE_FOLDER_PATH)
  .filter((path) => /\.mdx?$/.test(path));
