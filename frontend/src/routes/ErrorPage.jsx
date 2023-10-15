import React from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/error-page.module.css";

export const ErrorPage = () => {
  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <h1>Error 404: Not Found</h1>
        <h3>The requested page doesn't exist.</h3>
      </div>
    </>
  );
};
