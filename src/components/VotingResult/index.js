import React from "react";
import PropTypes from "prop-types";

import styles from "./VotingResult.module.css";

const VotingResult = ({ question }) => {
  console.log(question);
  const getTotalVotes = choices => {
    return choices.reduce((sum, curr) => (sum += curr.votes), 0);
  };

  const totalVotes = getTotalVotes(question.choices);

  return (
    <div className={styles.votingResult}>
      <h2 className={styles.title}>{question.title}</h2>
      <ul>
        {question.choices.map(({ choice, url, votes }) => (
          <li key={url}>
            <p>
              {choice} ({votes} {"  "}
              {votes > 1 ? <span>Votes</span> : <span>Vote</span>})
            </p>
            <div className={styles.progressBar}>
              <div
                className={styles.filler}
                style={{
                  width: `${(votes / totalVotes) * 100}%`
                }}
              >
                <span className={styles.filler__percentage}>
                  {((votes / totalVotes) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

VotingResult.propTypes = {
  title: PropTypes.string,
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        choice: PropTypes.string.isRequired,
        votes: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export default VotingResult;
