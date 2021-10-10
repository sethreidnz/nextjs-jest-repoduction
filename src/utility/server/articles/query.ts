import { OrderBy } from 'src/enums';
import { Article } from 'src/models';
import { ARTICLES } from './mdx';
import { sortArticles } from './orderBy';

export type ArticleQueryParams = {
  topic?: string;
};

export const hasTopic = (article: Article, topic: string): boolean => {
  const articleTopicSlugs = article.metadata.topics.map((topic) => topic.slug);
  return articleTopicSlugs.includes(topic);
};

export const getArticle = (slug: string): Article | undefined => {
  return ARTICLES.find((article) => article.metadata.slug === slug);
};

export const getArticles = (
  orderBy: OrderBy = OrderBy.ReverseChronological,
  queryParams: ArticleQueryParams = {}
): Article[] => {
  let result = [...ARTICLES];
  if (queryParams.topic) {
    result = result.filter(
      (article: Article) =>
        queryParams.topic && hasTopic(article, queryParams.topic)
    );
  }
  return sortArticles(result, orderBy);
};
