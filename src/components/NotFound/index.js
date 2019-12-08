import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <h1>404</h1>
      </div>
      <div className={styles.errorMessage}>
        <h2>oops! this page could not be found</h2>
        <Link className={styles.link} to="/">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
