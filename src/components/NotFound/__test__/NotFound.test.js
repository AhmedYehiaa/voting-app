import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

import NotFound from "../index";

afterEach(cleanup);

describe("NotFound Component", () => {
  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <NotFound />
      </Router>,
      div
    );
  });

  it("renders NotFound page with error message ", () => {
    const { getByTestId } = render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(getByTestId("errorMessage")).toHaveTextContent(
      "oops! this page could not be found"
    );
  });

  it("renders Not found page with Link to home page ", () => {
    const { getByTestId } = render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(getByTestId("link")).toBeEnabled();
  });

  it("matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <NotFound />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
