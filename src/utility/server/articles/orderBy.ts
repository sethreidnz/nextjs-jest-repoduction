import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';

// local imports
import { OrderBy } from 'src/enums';
import { Article } from 'src/models';

export const sortArticles = (articles: Article[], orderBy: OrderBy) => {
  switch (orderBy) {
    case OrderBy.ReverseChronological:
    default: {
      return [...articles].sort((a, b) => {
        const aDate = a.metadata.updatedAt
          ? new Date(a.metadata.updatedAt)
          : new Date(a.metadata.publishedAt);
        const bDate = b.metadata.updatedAt
          ? new Date(b.metadata.updatedAt)
          : new Date(b.metadata.publishedAt);

        if (isBefore(aDate, bDate)) {
          return 1;
        } else if (isEqual(aDate, bDate)) {
          return 0;
        } else {
          return -1;
        }
      });
    }
  }
};
