import fs from "fs";
import path from "path";

// local imports
import { ARTICLE_BASE_PATH, ARTICLE_METADATA_SCHEMA } from "src/constants";
import { FrontmatterErrorType } from "src/enums";
import { Frontmatter } from "src/models";
import { getTopicsFromSlugs } from "src/utility";
import {
  frontmatterErrorInvalidAttribute,
  frontmatterErrorInvalidAttributeOrder,
  frontmatterErrorInvalidSchema,
  frontmatterErrorInvalidYAML,
} from "src/utility/testing";
import {
  convertFrontmatterToMetadata,
  frontmatter,
  formatErrorAsString,
} from "./frontmatter";

const TEST_MARKDOWN_ROOT_PATH = "src/utility/testing/markdown";
const getTestMarkdownSource = (filepath: string): string => {
  const markdownPath = path.join(
    process.cwd(),
    TEST_MARKDOWN_ROOT_PATH,
    filepath
  );
  const source = fs.readFileSync(markdownPath);
  return source.toString();
};

describe("frontmatter()", () => {
  it(`should successfully process a valid article's frontmatter metadata`, () => {
    const filepath = "valid/article.mdx";
    const source = getTestMarkdownSource(filepath);
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/${filepath}`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(data.title).toBe("Valid Article");
    expect(data.description).toBe(
      "There have been days when I wished to be separated from my body, but today wasn’t one of those days. Last Friday I saw a spotted striped blue worm."
    );
    expect(data.publishedAt).toBe("2021-01-01");
    expect(data.image).toBe("valid-article.png");
    expect(data.author).toBe("Valid Article Author");
    expect(data.updatedAt).toBe("2021-01-20");
    expect(errors.length).toBe(0);
  });

  it(`should successfully process a valid article's frontmatter metadata with optional topics value`, () => {
    const filepath = "valid/articleWithTopics.mdx";
    const source = getTestMarkdownSource(filepath);
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/${filepath}`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(data.title).toBe("Valid Article with topics");
    expect(data.description).toBe(
      "They desperately needed another drummer since the current one only knew how to play bongos. The beauty of the sunset was obscured by the industrial cranes."
    );
    expect(data.publishedAt).toBe("2021-01-05");
    expect(data.image).toBe("valid-article-with-topics.png");
    expect(data.author).toBe("Valid Article With Topics Author");
    expect(data.updatedAt).toBe("2021-01-21");
    expect(data.topics.length).toBe(2);
    expect(data.topics[0]).toBe("devops");
    expect(data.topics[1]).toBe("web");
    expect(errors.length).toBe(0);
  });

  it(`should return correct error if article is missing the title`, () => {
    const filepath = "invalid/missingTitle.mdx";
    const source = getTestMarkdownSource(filepath);
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/${filepath}`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors[0].type).toBe(FrontmatterErrorType.InvalidSchema);
    expect(errors[0].property).toBe("title");
  });

  it(`should return correct error if article is missing the description`, () => {
    const filepath = "invalid/missingDescription.mdx";
    const source = getTestMarkdownSource(filepath);
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/${filepath}`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors[0].type).toBe(FrontmatterErrorType.InvalidSchema);
    expect(errors[0].property).toBe("description");
  });

  it(`should return correct error if metadata is in the wrong order`, () => {
    const filepath = "invalid/attributeOrder.mdx";
    const source = getTestMarkdownSource(filepath);
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/${filepath}`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors[0].type).toBe(FrontmatterErrorType.InvalidAttributeOrder);
  });

  it(`should return correct error if an invalid topic is provided`, () => {
    const filepath = "invalid/withInvalidTopic.mdx";
    const source = getTestMarkdownSource(filepath);
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/${filepath}`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors[0].type).toBe(FrontmatterErrorType.InvalidSchema);
  });

  it(`should return correct error if invalid attribute is added`, () => {
    const filepath = "invalid/attribute.mdx";
    const source = getTestMarkdownSource(filepath);
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/${filepath}`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors[0].type).toBe(FrontmatterErrorType.InvalidAttribute);
    expect(errors[0].property).toBe("invalidAttribute");
  });
  it("creates errors if YML has an unescaped quote", () => {
    const source = `---
title: 'It didn't make sense unless you had the power to eat colors'
description: The green tea and avocado smoothie turned out exactly as would be expected.
---
  
Everybody should read Chaucer to improve their everyday vocabulary.
`;
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/invalidAttribute.mdx`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors[0].type).toBe(FrontmatterErrorType.InvalidYAML);
  });

  it("creates correct error if frontmatter YML has incorrect indentation", () => {
    const source = `---
title: Tuesdays are free if you bring a gnome costume.
  description: Everybody should read Chaucer to improve their everyday vocabulary.
---

Patricia loves the sound of nails strongly pressed against the chalkboard..
`;
    const { content, data, errors } = frontmatter(
      source.toString(),
      `${TEST_MARKDOWN_ROOT_PATH}/invalidAttribute.mdx`,
      ARTICLE_METADATA_SCHEMA
    );
    expect(content).toBeDefined();
    expect(data).toBeDefined();
    expect(errors.length).toBe(1);
    expect(errors[0].type).toBe(FrontmatterErrorType.InvalidYAML);
  });
});

describe("convertFrontmatterToMetadata()", () => {
  it("correctly converts a complete metadata entry", () => {
    const frontmatter: Frontmatter = {
      title: "this is a title",
      description: "this is a description",
      publishedAt: "2021/01/07",
      updatedAt: "2021/01/07",
      topics: ["web", "devops"],
    };
    const slug = "example-article";
    const articleMetadata = convertFrontmatterToMetadata(frontmatter, slug);

    expect(articleMetadata).toBeDefined();
    expect(articleMetadata.title).toBe(frontmatter.title);
    expect(articleMetadata.description).toBe(frontmatter.description);
    expect(articleMetadata.path).toBe(`${ARTICLE_BASE_PATH}/${slug}`);
    expect(articleMetadata.publishedAt).toBe(
      new Date(frontmatter.publishedAt).toISOString()
    );
    expect(articleMetadata.updatedAt).toBe(
      new Date(frontmatter.updatedAt).toISOString()
    );
    const expectedTopics = getTopicsFromSlugs(frontmatter.topics);
    expect(articleMetadata.topics.sort()).toEqual(expectedTopics.sort());
  });

  it("correctly converts a valid but incomplete entry", () => {
    const frontmatter: Frontmatter = {
      title: "this is a title",
      description: "this is a description",
      publishedAt: "2021/01/07",
    };
    const slug = "example-article";
    const articleMetadata = convertFrontmatterToMetadata(frontmatter, slug);

    expect(articleMetadata).toBeDefined();
    expect(articleMetadata.title).toBe(frontmatter.title);
    expect(articleMetadata.description).toBe(frontmatter.description);
    expect(articleMetadata.path).toBe(`${ARTICLE_BASE_PATH}/${slug}`);
    expect(articleMetadata.publishedAt).toBe(
      new Date(frontmatter.publishedAt).toISOString()
    );
    expect(articleMetadata.updatedAt).toBeUndefined();
    expect(articleMetadata.topics).toEqual([]);
  });
});

describe("formatErrorAsString()", () => {
  it("should format an InvalidAttribute error correctly", () => {
    const error = frontmatterErrorInvalidAttribute();
    const result = formatErrorAsString(error);
    expect(result).toBe(
      `ErrorType: ${error.type}. Attribute '${error.property}' ${error.message}`
    );
  });

  it("should format an InvalidAttributeOrder error correctly", () => {
    const error = frontmatterErrorInvalidAttributeOrder();
    const result = formatErrorAsString(error);
    expect(result).toBe(`ErrorType: ${error.type}. ${error.message}`);
  });

  it("should format an InvalidSchema error correctly", () => {
    const error = frontmatterErrorInvalidSchema();
    const result = formatErrorAsString(error);
    expect(result).toBe(
      `ErrorType: ${error.type}. Error with attribute '${error.property}': ${error.message}`
    );
  });

  it("should format an InvalidYAML error correctly", () => {
    const error = frontmatterErrorInvalidYAML();
    const result = formatErrorAsString(error);
    expect(result).toBe(`ErrorType: ${error.type}. ${error.message}`);
  });
});
