import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

import Question from "../index";

describe("<Question />", () => {
  const question = {
    title: "question title",
    url: "questionUrl/url",
    publishedAt: "2015-05-27T21:22:26.648000+00:00",
    choicesLength: 5
  };

  afterEach(cleanup);

  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Question
          title={question.title}
          url={question.url}
          publishedAt={question.publishedAt}
          choicesLength={question.choicesLength}
        />
      </Router>,
      div
    );
  });

  it("render question component with the passed props", () => {
    const { getByTestId } = render(
      <Router>
        <Question
          title={question.title}
          url={question.url}
          publishedAt={question.publishedAt}
          choicesLength={question.choicesLength}
        />
      </Router>
    );
    expect(getByTestId("title").textContent).toBe(question.title);
    expect(getByTestId("choicesLength").textContent).toBe(
      String(question.choicesLength)
    );
    expect(getByTestId("publishedAt").textContent).toBe("May, 27, 2015");
  });

  it("matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <Question
            title={question.title}
            url={question.url}
            publishedAt={question.publishedAt}
            choicesLength={question.choicesLength}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
