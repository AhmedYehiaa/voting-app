import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { API_BASE_URL } from "../../constants";
import VotingResult from "../../components/VotingResult";
import Spinner from "../../components/Spinner";

import styles from "./QuestionDetails.module.css";

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
      const result = await axios.get(`${API_BASE_URL}/questions/${id}`);
      const { data } = result;
      setQuestion({
        title: data.question,
        url: data.url,
        choices: data.choices
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Question not Found");
    }
  };

  const saveVote = async url => {
    try {
      await axios.post(`${API_BASE_URL + url}`);
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
          <h1 className={styles.title}>{question.title}</h1>
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
    <div>
      {showResult ? <VotingResult question={question} /> : renderQuestion()}
    </div>
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
