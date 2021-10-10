import matter from 'gray-matter';
import revalidator from 'revalidator';
import difference from 'lodash/difference';
import intersection from 'lodash/intersection';
import {
  Frontmatter,
  FrontmatterResult,
  FrontmatterError,
  ArticleMetadata,
} from 'src/models';
import { FrontmatterErrorType, PageType } from 'src/enums';
import { ARTICLE_BASE_PATH, DEFAULT_SEO } from 'src/constants';
import { getTopicsFromSlugs } from 'src/utility';

export const frontmatter = (
  markdown: string,
  filepath: string,
  schema: Revalidator.JSONSchema<Frontmatter>
): FrontmatterResult => {
  let content, data;

  // process the frontmatter YAML
  try {
    ({ content, data } = matter(markdown));
  } catch (e) {
    const defaultReason = 'invalid frontmatter entry';
    const er = e as FrontmatterError;
    const reason = er.reason
      ? // make this common error message a little easier to understand
        er.reason.startsWith('can not read a block mapping entry;')
        ? defaultReason
        : er.reason
      : defaultReason;

    const error: FrontmatterError = {
      type: FrontmatterErrorType.InvalidYAML,
      reason,
      message: 'Error processing frontmatter YAML',
      filepath,
    };

    if (filepath) {
      error.filepath = filepath;
    }
    return { content: '', data: {}, errors: [error] };
  }

  const allowedKeys = schema.properties ? Object.keys(schema.properties) : [];
  const existingKeys = Object.keys(data);
  const expectedKeys = intersection(allowedKeys, existingKeys);

  let errors: FrontmatterError[] = [];
  const { valid, errors: schemaErrors } = revalidator.validate(data, schema);

  if (!valid) {
    errors = schemaErrors.map((error) => ({
      type: FrontmatterErrorType.InvalidSchema,
      property: error.property,
      message: error.message,
      filepath,
    }));
  }

  // validate key names
  const invalidKeys = difference(existingKeys, allowedKeys);
  let hasInvalidKeyNames = false;
  invalidKeys.forEach((key) => {
    const error = {
      type: FrontmatterErrorType.InvalidAttribute,
      property: key,
      filepath,
      message: `not allowed. Allowed properties are: ${allowedKeys.join(', ')}`,
    };
    errors.push(error);
    hasInvalidKeyNames = true;
  });

  // validate key order only if there isn't already an invalid attribute name since this will always fail in that case
  // and having both errors is not really helpful
  if (!hasInvalidKeyNames && existingKeys.join('') !== expectedKeys.join('')) {
    const error = {
      type: FrontmatterErrorType.InvalidAttributeOrder,
      property: 'keys',
      message: `Keys must be in order. Current order: ${existingKeys.join(
        ','
      )}; Expected order: ${expectedKeys.join(',')}`,
      filepath,
    };
    errors.push(error);
  }

  return { content, data, errors };
};

/**
 * Takes the data result of a call to the frontmatter() and converts it into an ArticleMetadata model
 */
export const convertFrontmatterToMetadata = (
  frontmatter: Frontmatter,
  slug: string
): ArticleMetadata => {
  const articleMetadata: ArticleMetadata = {
    path: `${ARTICLE_BASE_PATH}/${slug}`,
    slug,
    title: frontmatter['title'],
    description: frontmatter['description'],
    author: frontmatter['author'] ? frontmatter['author'] : DEFAULT_SEO.author,
    pageType: PageType.Article,
    publishedAt: new Date(frontmatter['publishedAt']).toISOString(),
    image: frontmatter['image'],
    topics:
      frontmatter['topics'] && Array.isArray(frontmatter['topics'])
        ? getTopicsFromSlugs(frontmatter['topics'] as string[])
        : [],
  };

  if (frontmatter['updatedAt']) {
    articleMetadata.updatedAt = new Date(
      frontmatter['updatedAt']
    ).toISOString();
  }
  return articleMetadata;
};

export const formatErrorAsString = (error: FrontmatterError): string => {
  switch (error.type) {
    case FrontmatterErrorType.InvalidAttribute: {
      return `ErrorType: ${error.type}. Attribute '${error.property}' ${error.message}`;
    }
    case FrontmatterErrorType.InvalidSchema: {
      return `ErrorType: ${error.type}. Error with attribute '${error.property}': ${error.message}`;
    }
    case FrontmatterErrorType.InvalidAttributeOrder:
    case FrontmatterErrorType.InvalidYAML:
    default: {
      return `ErrorType: ${error.type}. ${error.message}`;
    }
  }
};
