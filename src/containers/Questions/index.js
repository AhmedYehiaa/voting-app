import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./Questions.module.css";
import { API_BASE_URL } from "../../constants";
import Question from "../../components/Question";
import Spinner from "../../components/Spinner";

const Questions = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/questions`);
      setLoading(false);
      setQuestions(response.data);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong !");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.subHeader}>
        <h1 className={styles.title}>
          Check out some live polls or add a new one
        </h1>
        <button onClick={() => history.push("/questions/new")}>
          Add poll{"   "}
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.questionWrapper}>
          {questions.map(question => (
            <Question
              key={question.url}
              url={question.url}
              title={question.question}
              publishedAt={question.published_at}
              choicesLength={question.choices.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default withRouter(Questions);
