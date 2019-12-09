import React from "react";
import logo from "../../assets/vote.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.logo}>
        <img src={logo} alt="logo" data-testid="img" />
        <p>Create simple polls quickly and easily</p>
      </div>
    </header>
  );
};

export default Header;
