import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import VotingResult from "../../components/VotingResult";
import Spinner from "../../components/Spinner";
import styles from "./QuestionDetails.module.css";
import { getQuestionById, voteOnChoice } from "../../services/APIcalls";

const QuestionDetails = ({ history, match }) => {
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [question, setQuestion] = useState({
    title: "",
    url: "",
    choices: []
  });

  useEffect(() => {
    const { id } = match.params;
    getQuestion(id);
  }, [match.params]);

  const getQuestion = async id => {
    try {
      setLoading(true);
      const result = await getQuestionById(id);
      setQuestion({
        title: result.question,
        url: result.url,
        choices: result.choices
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Question not Found");
    }
  };

  const saveVote = async url => {
    try {
      setLoading(true);
      const result = voteOnChoice(url);
      const updateChoices = question.choices.map(choice => {
        if (choice.choice === result.choice) {
          choice.votes = result.votes;
        }
        return choice;
      });
      const updatedQuestion = { ...question };
      updatedQuestion.choices = [...updateChoices];
      setQuestion(updatedQuestion);
      setShowResult(true);
    } catch (error) {
      history.replace("not-found");
    }
  };

  const renderQuestion = () => {
    if (loading) {
      return <Spinner />;
    } else if (errorMessage) {
      history.replace("/not-found");
    } else {
      return (
        <div className={styles.questionDetails}>
          <h2 className={styles.title}>{question.title}</h2>
          <ul>
            {question.choices.map(({ url, choice }) => (
              <li key={url} onChange={() => saveVote(url)}>
                <label className={styles.container}>
                  {choice}
                  <input type="radio" name="radio" />
                  <span className={styles.checkmark}></span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <>{showResult ? <VotingResult question={question} /> : renderQuestion()}</>
  );
};

QuestionDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default QuestionDetails;
