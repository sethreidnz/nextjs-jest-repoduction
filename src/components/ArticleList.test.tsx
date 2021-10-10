import { array } from "cooky-cutter";

// local import
import { render, screen, within } from "src/utility/testing";
import { ArticleList } from "src/components";
import { article } from "src/utility/testing/factories";

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
      expect(articleHeading).toHaveTextContent(articles[articleIndex].title);
    });
  });
});
