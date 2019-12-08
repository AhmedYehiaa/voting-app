import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.spinner}>
    <svg viewBox="0 0 50 50">
      <circle
        className={styles.path}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="2"
      />
    </svg>
  </div>
);

export default Spinner;
