import Link from "next/link";

// local imports
import { formatDate, getTopicPagePath } from "src/utility";
import { Article } from "src/models";

type ArticleMetadataProps = {
  article: Article;
  includeTopics?: boolean;
};

export const ArticleMetadata = ({
  article,
  includeTopics = false,
}: ArticleMetadataProps) => {
  const { updatedAt, publishedAt, topics } = article.metadata;
  return (
    <div className="flex">
      <span className="text-xs font-semibold uppercase">
        {formatDate(updatedAt ? new Date(updatedAt) : new Date(publishedAt))}
      </span>
      {includeTopics && topics && topics.length > 0 ? (
        <ul aria-label="Article Topics" className="flex">
          {topics.map((topic) => (
            <li key={topic.slug} className="pr-4">
              <Link href={getTopicPagePath(topic)} passHref>
                <a className="rounded-xl bg-primary text-white">
                  {topic.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
