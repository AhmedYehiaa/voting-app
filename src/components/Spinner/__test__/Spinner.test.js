import React from "react";
import ReactDOM from "react-dom";

import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

import Spinner from "../index";

describe("Spinner Component", () => {
  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Spinner />, div);
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
