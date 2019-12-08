import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faListOl } from "@fortawesome/free-solid-svg-icons";

import styles from "./Question.module.css";

const Question = ({ title, url, publishedAt, choicesLength }) => {
  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <h3 className={styles.questionCardTitle}>{title}</h3>
        <div className={styles.questionCardBody}>
          <div>
            <FontAwesomeIcon icon={faCalendarDay} />
            <p>
              {new Date(publishedAt)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(", ")}
            </p>
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

export default Question;
