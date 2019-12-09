import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

import SubHeader from "../index";

afterEach(cleanup);

describe("SubHeader Component", () => {
  let title = "component title";
  let btnText = "button text";

  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <SubHeader title={title} buttonText={btnText} />
      </Router>,
      div
    );
  });

  it("render SubHeader page with title and button", () => {
    const { getByTestId } = render(
      <Router>
        <SubHeader title={title} buttonText={btnText} />
      </Router>
    );
    expect(getByTestId("title").textContent).toBe(title);
    expect(getByTestId("button").textContent).toBe(`${btnText}` + "   ");
  });

  it("matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <SubHeader title={title} buttonText={btnText} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
