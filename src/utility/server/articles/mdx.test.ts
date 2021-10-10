import path from "path";
import { getTopicFromSlug } from "src/utility/topics";

// local imports
import { generateArticle } from "./mdx";

const VALID_ARTICLES_PATH = path.join(
  process.cwd(),
  "src/utility/testing/markdown/valid"
);

const INVALID_ARTICLES_PATH = path.join(
  process.cwd(),
  "src/utility/testing/markdown/invalid"
);

describe("generateArticle()", () => {
  it("should correctly process a valid article without topics", () => {
    const article = generateArticle("article", VALID_ARTICLES_PATH);
    expect(article.content).toBeDefined();
    expect(article.metadata).toBeDefined();
    expect(article.metadata.title).toBe("Valid Article");
    expect(article.metadata.description).toBe(
      "There have been days when I wished to be separated from my body, but today wasn’t one of those days. Last Friday I saw a spotted striped blue worm."
    );
    expect(article.metadata.publishedAt).toBe(
      new Date("2021-01-01").toISOString()
    );
    expect(article.metadata.image).toBe("valid-article.png");
    expect(article.metadata.author).toBe("Valid Article Author");
    expect(article.metadata.updatedAt).toBe(
      new Date("2021-01-20").toISOString()
    );
  });

  it("should correctly process a valid article with topics", () => {
    const article = generateArticle("articleWithTopics", VALID_ARTICLES_PATH);
    expect(article.content).toBeDefined();
    expect(article.metadata).toBeDefined();
    expect(article.metadata.title).toBe("Valid Article with topics");
    expect(article.metadata.description).toBe(
      "They desperately needed another drummer since the current one only knew how to play bongos. The beauty of the sunset was obscured by the industrial cranes."
    );
    expect(article.metadata.publishedAt).toBe(
      new Date("2021-01-05").toISOString()
    );
    expect(article.metadata.image).toBe("valid-article-with-topics.png");
    expect(article.metadata.author).toBe("Valid Article With Topics Author");
    expect(article.metadata.updatedAt).toBe(
      new Date("2021-01-21").toISOString()
    );
    expect(article.metadata.topics.length).toBe(2);
    expect(article.metadata.topics[0]).toBe(getTopicFromSlug("devops"));
    expect(article.metadata.topics[1]).toBe(getTopicFromSlug("web"));
  });

  it(`should throw an error if the markdown file doesn't exist in that folder with provided slug`, () => {
    const slug = "doest-exist";
    const filePath = path.join(VALID_ARTICLES_PATH, `${slug}.mdx`);
    expect(() => {
      generateArticle(slug, VALID_ARTICLES_PATH);
    }).toThrow(
      `Cannot find article using slug '${slug}' using filepath '${filePath}'`
    );
  });

  it(`should throw an error if frontmatter data is invalid`, () => {
    const slug = "attribute";
    const filePath = path.join(INVALID_ARTICLES_PATH, `${slug}.mdx`);
    expect(() => {
      generateArticle(slug, INVALID_ARTICLES_PATH);
    })
      .toThrowError(`Error processing frontmatter metadata for article with slug '${slug}' at filepath '${filePath}': 
      \n\n Error 1: ErrorType: InvalidAttribute. Attribute 'invalidAttribute' not allowed. Allowed properties are: title, description, publishedAt, image, author, updatedAt, topics`);
  });
});
