import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./SubHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const SubHeader = ({ title, buttonText, history }) => {
  return (
    <div className={styles.subHeader} data-testid="subHeader'">
      <h1 className={styles.title} data-testid="title">
        {title}
      </h1>
      <button
        onClick={() => history.push("/questions/new")}
        data-testid="button"
      >
        {buttonText}
        {"   "}
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
    </div>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default withRouter(SubHeader);
