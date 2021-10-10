import Link from "next/link";

// local imports
import { Article } from "src/models";
import { getPageUrl } from "src/utility";
import { ArticleMetadata } from "src/components";
import { Button } from "src/components";

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList = ({ articles }: ArticleListProps) => (
  <>
    {articles.length > 0 ? (
      <ul className="py-4">
        {articles.map((article: Article) => (
          <li key={article.filePath} className="pb-8">
            <article aria-labelledby={`ArticleTitle-${article.metadata.slug}`}>
              <h2
                id={`ArticleTitle-${article.metadata.slug}`}
                className="text-secondary"
              >
                <Link href={article.metadata.path}>
                  <a>{article.metadata.title}</a>
                </Link>
              </h2>
              <ArticleMetadata article={article} />
              <p className="mt-2 mb-3 sm:mb-4">
                {article.metadata.description}
              </p>
              <Button
                ariaLabel={`Read more of the article ${article.metadata.title}`}
                href={getPageUrl(
                  article.metadata.path,
                  article.metadata.pageType,
                  true
                )}
              >
                Read more
              </Button>
            </article>
          </li>
        ))}
      </ul>
    ) : (
      <>Sorry there are no articles matching your query</>
    )}
  </>
);
