import { define } from 'cooky-cutter';

// local imports
import { Topic } from 'src/models';

export const topic = define<Topic>({
  title: (i: number) => `Test topic ${i}`,
  slug: (i: number) => `test-topic-${i}`,
  description: (i: number) => `Test topic description ${i}`,
  icon: (i: number) => `test-topic-${i}`,
});
