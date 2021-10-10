import { array } from "cooky-cutter";

// local import
import { render, screen, within } from "src/utility/testing";
import { ArticleList } from "./ArticleList";
import {
  article,
  articleItemWithNoTopics,
  articleWithUpdatedDate,
} from "src/utility/testing/factories";
import { formatDate } from "src/utility";

describe("<ArticleList/>", () => {
  it("should render no articles correctly", () => {
    render(<ArticleList articles={[]} />);
    screen.findByText("Sorry there are no articles matching your query");
  });

  it("should render list of articles correctly when they only have a publishedAt", () => {
    const articles = array(article, 5)();
    render(<ArticleList articles={articles} />);

    // get each article list item
    const articleListItems = screen.getAllByRole("article");

    // validate each list item has rendered correctly
    articleListItems.forEach((articleListItem, articleIndex) => {
      const articleHeading = within(articleListItem).getByRole("heading");

      // heading
      expect(articleHeading).toHaveTextContent(
        articles[articleIndex].metadata.title
      );

      // validate the published date
      expect(
        within(articleListItem).getByText(
          `${formatDate(new Date(articles[articleIndex].metadata.publishedAt))}`
        )
      ).toBeInTheDocument();

      // validate the link inside the heading is correct
      expect(within(articleHeading).getByRole("link")).toHaveAttribute(
        "href",
        articles[articleIndex].metadata.path
      );

      // // validate that the topics are being rendered
      // const topicListItems = within(articleListItem).getAllByRole('listitem');
      // topicListItems.forEach((topicListItem, topicIndex) => {
      //   // validate the topic is rendered
      //   expect(
      //     within(topicListItem).getByText(
      //       articles[articleIndex].metadata.topics[topicIndex].title
      //     )
      //   ).toBeInTheDocument();

      //   // validate the topic link has the right href
      //   expect(within(topicListItem).getByRole('link')).toHaveAttribute(
      //     'href',
      //     getTopicPagePath(articles[articleIndex].metadata.topics[topicIndex])
      //   );
      // });

      // validate the description is rendered
      expect(
        within(articleListItem).getByText(
          articles[articleIndex].metadata.description
        )
      ).toBeInTheDocument();

      // validate the read more link is rendered with the correct href
      expect(within(articleListItem).getByText("Read more")).toHaveAttribute(
        "href",
        articles[articleIndex].metadata.path
      );
    });
  });

  it("should render list of articles correctly when they  have updatedAt", () => {
    const articles = array(articleWithUpdatedDate, 5)();
    render(<ArticleList articles={articles} />);

    // get each article list item
    const articleListItems = screen.getAllByRole("article");

    // validate each list item has rendered correctly
    articleListItems.forEach((articleListItem, articleIndex) => {
      const articleHeading = within(articleListItem).getByRole("heading");

      // heading
      expect(articleHeading).toHaveTextContent(
        articles[articleIndex].metadata.title
      );

      // validate the published date
      expect(
        within(articleListItem).getByText(
          `${formatDate(
            new Date(articles[articleIndex].metadata.updatedAt!) // eslint-disable-line @typescript-eslint/no-non-null-assertion
          )}`
        )
      ).toBeInTheDocument();

      // validate the link inside the heading is correct
      expect(within(articleHeading).getByRole("link")).toHaveAttribute(
        "href",
        articles[articleIndex].metadata.path
      );

      // // validate that the topics are being rendered
      // const topicListItems = within(articleListItem).getAllByRole('listitem');
      // topicListItems.forEach((topicListItem, topicIndex) => {
      //   // validate the topic is rendered
      //   expect(
      //     within(topicListItem).getByText(
      //       articles[articleIndex].metadata.topics[topicIndex].title
      //     )
      //   ).toBeInTheDocument();

      //   // validate the topic link has the right href
      //   expect(within(topicListItem).getByRole('link')).toHaveAttribute(
      //     'href',
      //     getTopicPagePath(articles[articleIndex].metadata.topics[topicIndex])
      //   );
      // });

      // validate the description is rendered
      expect(
        within(articleListItem).getByText(
          articles[articleIndex].metadata.description
        )
      ).toBeInTheDocument();

      // validate the read more link is rendered with the correct href
      expect(within(articleListItem).getByText("Read more")).toHaveAttribute(
        "href",
        articles[articleIndex].metadata.path
      );
    });
  });

  it("should render list of articles correctly when the article has no topics", () => {
    const articles = array(articleItemWithNoTopics, 5)();
    render(<ArticleList articles={articles} />);

    // get each article list item
    const articleListItems = screen.getAllByRole("article");

    // validate each list item has rendered correctly
    articleListItems.forEach((articleListItem, articleIndex) => {
      const articleHeading = within(articleListItem).getByRole("heading");

      // heading
      expect(articleHeading).toHaveTextContent(
        articles[articleIndex].metadata.title
      );

      // validate the published date
      expect(
        within(articleListItem).getByText(
          `${formatDate(new Date(articles[articleIndex].metadata.publishedAt))}`
        )
      ).toBeInTheDocument();

      // validate the link inside the heading is correct
      expect(within(articleHeading).getByRole("link")).toHaveAttribute(
        "href",
        articles[articleIndex].metadata.path
      );

      // // validate that the topics are being rendered
      // const topicListItems = within(articleListItem).queryByRole('listitem');
      // expect(topicListItems).toBeNull();

      // validate the description is rendered
      expect(
        within(articleListItem).getByText(
          articles[articleIndex].metadata.description
        )
      ).toBeInTheDocument();

      // validate the read more link is rendered with the correct href
      const readMoreButton = within(articleListItem).getByText("Read more");
      expect(readMoreButton).toHaveAttribute(
        "href",
        articles[articleIndex].metadata.path
      );
      expect(readMoreButton).toHaveAttribute(
        "aria-label",
        `Read more of the article ${articles[articleIndex].metadata.title}`
      );
    });
  });
});
