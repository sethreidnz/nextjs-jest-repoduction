import { DEPLOY_URL } from 'src/constants';
import { PageType } from 'src/enums';

export const getPageUrl = (
  path: string,
  type: PageType,
  relative = false
): string => {
  const baseUrl = !relative ? DEPLOY_URL : '';
  switch (type) {
    case PageType.Article: {
      return `${baseUrl}${path}`;
    }
    default: {
      return `${baseUrl}${path}`;
    }
  }
};
