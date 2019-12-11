import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, within, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

import NewQuestion from "../index";

describe("<NewQuestion />", () => {
  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <NewQuestion />
      </Router>,
      div
    );
  });

  it("add new question with choices", () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Router>
        <NewQuestion />
      </Router>
    );
    const questionInput = getByPlaceholderText("Add question");
    const choiceInput = getByPlaceholderText("Add choice");
    const addChoiceBtn = getByTestId("addChoiceBtn");
    const questionTitle = "new question ?";
    const newChoice = "new choice";

    fireEvent.change(questionInput, { target: { value: questionTitle } });
    fireEvent.change(choiceInput, { target: { value: newChoice } });
    fireEvent.click(addChoiceBtn);

    expect(choiceInput).toHaveValue("");
    expect(getByTestId("choice").textContent).toBe(`1.    ${newChoice}`);
    fireEvent.change(choiceInput, { target: { value: newChoice } });
  });

  it("remove choice from choices list", () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Router>
        <NewQuestion />
      </Router>
    );
    const questionInput = getByPlaceholderText("Add question");
    const choiceInput = getByPlaceholderText("Add choice");
    const addChoiceBtn = getByTestId("addChoiceBtn");
    const questionTitle = "new question ?";
    const newChoice = "new choice";

    fireEvent.change(questionInput, { target: { value: questionTitle } });
    fireEvent.change(choiceInput, { target: { value: newChoice } });
    fireEvent.click(addChoiceBtn);

    expect(choiceInput).toHaveValue("");

    fireEvent.change(choiceInput, { target: { value: newChoice } });
    fireEvent.click(addChoiceBtn);

    expect(getByTestId("choicesList").children.length).toBe(2);
    const removeChoicBtn = within(getByTestId("removeChoiceBtn-1")).getByText(
      /remove/i
    );
    fireEvent.click(removeChoicBtn);
    expect(getByTestId("choicesList").children.length).toBe(1);
  });

  it("matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <NewQuestion />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
