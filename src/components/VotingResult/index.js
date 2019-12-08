import React from "react";
import PropTypes from "prop-types";

import styles from "./VotingResult.module.css";

const VotingResult = ({ question }) => {
  const getTotalVotes = choices => {
    return choices.reduce((sum, curr) => (sum += curr.votes), 0);
  };

  const totalVotes = getTotalVotes(question.choices);

  return (
    <div className={styles.votingResult}>
      <h1 className={styles.title}>{question.title}</h1>
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
    choices: PropTypes.arrayOf(PropTypes.stirng)
  }).isRequired
};

export default VotingResult;
