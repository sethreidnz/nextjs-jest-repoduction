import { Topic } from 'src/models/Topic';

export const TOPICS: Topic[] = [
  {
    title: 'Web',
    slug: 'web',
    description: 'Web is what it is',
    icon: require('src/images/web.svg'),
  },
  {
    title: 'Cloud',
    slug: 'cloud',
    description: 'Cloud is pretty cool',
    icon: require('src/images/cloud.svg'),
  },
  {
    title: 'Devops',
    slug: 'devops',
    description: 'Devops is automating things',
    icon: require('src/images/devops.svg'),
  },
];

export const TOPIC_SLUGS = TOPICS.map((topic) => topic.slug);
