import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

import Header from "../index";

afterEach(cleanup);

describe("Header Component", () => {
  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header />, div);
  });

  it("renders Header with text ", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("header")).toHaveTextContent(
      "Create simple polls quickly and easily"
    );
  });

  it("renders Header with img ", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("img")).toBeEnabled();
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
