import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faListOl } from "@fortawesome/free-solid-svg-icons";

import styles from "./Question.module.css";

const Question = ({ title, url, publishedAt, choicesLength }) => {
  const formateDate = () => {
    return new Date(publishedAt)
      .toDateString()
      .split(" ")
      .slice(1)
      .join(", ");
  };
  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <h3 className={styles.questionCardTitle}>{title}</h3>
        <div className={styles.questionCardBody}>
          <div>
            <FontAwesomeIcon icon={faCalendarDay} />
            <p>{formateDate()}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faListOl} />
            <p>
              <span>{choicesLength}</span>
              {"  "}choices
            </p>
          </div>
        </div>
      </div>
      <div className={styles.voteNow}>
        <div className={styles.voteNowText}>VOTE NOW</div>
      </div>
    </div>
  );
};

Question.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  choicesLength: PropTypes.number.isRequired
};

export default Question;
