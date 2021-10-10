import { TOPICS } from "src/constants";
import { getTopicsFromSlugs } from "src/utility";

describe("getTopicsFromSlugs()", () => {
  it("should correctly return an empty array if topics are not valid", () => {
    const slugs = ["invalid"];
    const topics = getTopicsFromSlugs(slugs);

    expect(topics.length).toBe(0);
  });

  it("should return correct topic for single valid topic", () => {
    const slugs = [TOPICS[0].slug];
    const topics = getTopicsFromSlugs(slugs);

    expect(topics.length).toBe(1);
    expect(topics[0]).toBe(TOPICS[0]);
  });

  it("should return correct topic if all valid topics are provided", () => {
    const slugs = TOPICS.map((topic) => topic.slug);
    const topics = getTopicsFromSlugs(slugs);

    expect(topics.length).toBe(TOPICS.length);
    expect(topics[0]).toBe(TOPICS[0]);
    expect(topics.sort()).toEqual(TOPICS.sort());
  });
});
