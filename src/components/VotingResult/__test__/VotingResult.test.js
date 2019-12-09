import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

import VotingResult from "../index";

afterEach(cleanup);

describe("Voting Result Component", () => {
  const question = {
    title: "Favourite hot beverage?",
    published_at: "2015-05-27T21:22:26.648000+00:00",
    url: "/questions/9",
    choices: [
      {
        choice: "Apple Cider",
        votes: 30,
        url: "/questions/9/choices/67"
      },
      {
        choice: "Tea",
        votes: 30,
        url: "/questions/9/choices/65"
      },
      {
        choice: "Hot Chocolate",
        votes: 21,
        url: "/questions/9/choices/68"
      },
      {
        choice: "Coffee",
        votes: 17,
        url: "/questions/9/choices/66"
      }
    ]
  };

  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <VotingResult question={question} />
      </Router>,
      div
    );
  });

  it("render Voting Result page with question", () => {
    const { getByTestId } = render(
      <Router>
        <VotingResult question={question} />
      </Router>
    );
    expect(getByTestId("title").textContent).toBe(question.title);
  });

  it("render choices list with count equals to 4", () => {
    const { getByTestId } = render(
      <Router>
        <VotingResult question={question} />
      </Router>
    );
    const choices = getByTestId("choices");
    expect(choices.children.length).toBe(4);
  });

  it("matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <VotingResult question={question} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
