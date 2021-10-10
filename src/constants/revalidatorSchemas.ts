import { TOPIC_SLUGS } from './topics';
import { Frontmatter } from 'src/models';

export const ARTICLE_METADATA_SCHEMA: Revalidator.JSONSchema<Frontmatter> = {
  properties: {
    title: {
      description: 'the title of the article',
      type: 'string',
      required: true,
    },
    description: {
      description: 'the meta description of the article',
      type: 'string',
      required: true,
      minLength: 120,
      maxLength: 158,
    },
    publishedAt: {
      description: 'the date the article was first published',
      type: 'string',
      format: 'date',
      required: true,
    },
    image: {
      description: 'the featured image for the article',
      type: 'string',
      required: true,
    },
    author: {
      description: '(optional) the author of the article',
      type: 'string',
      required: false,
    },
    updatedAt: {
      description:
        '(optional) the last updated date that is displayed on the article',
      type: 'string',
      format: 'date',
      required: false,
    },
    topics: {
      description: '(optional) the topics in the article',
      type: 'array',
      required: false,
      conform: (value: string[]): boolean => {
        // ensure that the topics provided exist in the supported lis of topic slugs
        return value.every((item) => TOPIC_SLUGS.includes(item));
      },
    },
  },
};
