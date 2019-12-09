import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import styles from "./NewQuestion.module.css";
import Spinner from "../../components/Spinner";

import { addNewQuestion } from "../../services/APIcalls";

const NewQuestion = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [newChoice, setNewChoice] = useState("");

  const addChoice = () => {
    if (newChoice.trim()) {
      setChoices([...choices, newChoice]);
      setNewChoice("");
    }
  };

  const handleQuestionChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setQuestion(value);
  };

  const handleChoiceChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setNewChoice(value);
  };

  const handleDelete = index => {
    const filteredChoices = [...choices];
    filteredChoices.splice(index, 1);
    setChoices(filteredChoices);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const body = {
      question,
      choices
    };
    try {
      setLoading(true);
      await addNewQuestion(body);
      setLoading(false);
      history.replace("/");
    } catch (error) {
      setLoading(false);
      history.replace("/not-found");
    }
  };

  const rendeCondition = () => {
    if (loading) return <Spinner />;
    else {
      return (
        <div className={styles.newQuestionContainer}>
          <div className={styles.newQuestionForm}>
            <div className={styles.questionInput}>
              <label htmlFor="question">Question</label>
              <div className={styles.inputGroup}>
                <input
                  value={question}
                  placeholder="Add new Question"
                  onChange={handleQuestionChange}
                />
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
                  onChange={handleChoiceChange}
                />
                <button onClick={addChoice} className={styles.addChoiceBtn}>
                  Add choice <FontAwesomeIcon icon={faPlus} />
                </button>
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
            <button
              disabled={!(question && choices.length >= 2)}
              className={styles.submitButton}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      );
    }
  };

  return rendeCondition();
};

export default withRouter(NewQuestion);
