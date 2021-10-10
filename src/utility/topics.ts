import { TOPICS } from 'src/constants';
import { Topic } from 'src/models/Topic';

export const getTopicFromSlug = (slug: string): Topic | undefined => {
  return TOPICS.find((topic) => topic.slug === slug);
};

export const getTopicsFromSlugs = (slugs: string[]): Topic[] => {
  const topics: Topic[] = [];
  slugs.forEach((slug) => {
    const topic = getTopicFromSlug(slug);
    if (topic) {
      topics.push(topic);
    }
  });
  return topics;
};

export const getTopicPagePath = (topic: Topic): string => {
  return `/topics/${topic.slug}`;
};
