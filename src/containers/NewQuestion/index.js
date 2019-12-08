import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import styles from "./NewQuestion.module.css";

const NewQuestion = () => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [newChoice, setNewChoice] = useState("");

  const addChoice = () => {
    if (newChoice.trim()) {
      setChoices([...choices, newChoice]);
      setNewChoice("");
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    event.preventDefault();
    if (name === "question") {
      setQuestion(value);
    } else if (name === "currentChoice") {
      setNewChoice(value);
    }
  };

  const handleDelete = index => {
    const filteredChoices = [...choices];
    filteredChoices.splice(index, 1);
    setChoices(filteredChoices);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Submitted Successfully");
    console.log(question);
    console.log(choices);
  };

  return (
    <div className={styles.newQuestionContainer}>
      <form className={styles.newQuestionForm} onSubmit={handleSubmit}>
        <div className={styles.questionInput}>
          <label htmlFor="question">Question</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="question"
              name="question"
              value={question}
              placeholder="Add new Question"
              onChange={handleChange}
            />
            {/* error message here  */}
          </div>
        </div>
        <div className={styles.choiceInput}>
          <label htmlFor="currentChoice">Choices</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="currentChoice"
              name="currentChoice"
              value={newChoice}
              placeholder="Add new Choice"
              onChange={handleChange}
              onKeyPress={e => e.key === "Enter" && addChoice()}
            />
            <button onClick={addChoice} className={styles.addChoiceBtn}>
              Add choice <FontAwesomeIcon icon={faPlus} />
            </button>
            {/* error message here  */}
          </div>
        </div>
        {choices.length > 0 ? (
          <div className={styles.choicesListWrapper}>
            <ul className={styles.choicesList}>
              {choices.map((choice, index) => (
                <li key={choice + index}>
                  <p>
                    {index + 1}. {"   "}
                    {choice}
                  </p>
                  <FontAwesomeIcon
                    title="remove"
                    onClick={() => handleDelete(index)}
                    icon={faTrashAlt}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <button disabled className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewQuestion;
