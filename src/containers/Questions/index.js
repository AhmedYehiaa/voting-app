import React, { useState, useEffect } from "react";

import styles from "./Questions.module.css";
import Question from "../../components/Question";
import Spinner from "../../components/Spinner";
import { getQuestions as getQuestionsAPI } from "../../services/APIcalls";
import SubHeader from "../../components/SubHeader";

const Questions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      setLoading(true);
      const questions = await getQuestionsAPI();
      setLoading(false);
      setQuestions(questions);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong !");
    }
  };

  return (
    <div className={styles.container}>
      <SubHeader
        title="Check out some live polls or add a new one"
        buttonText="Add Poll"
      />
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

export default Questions;
