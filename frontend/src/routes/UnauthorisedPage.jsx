import React from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/error-page.module.css";

export const UnauthorisedPage = () => {
  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <h1>Error 401: Unauthorised</h1>
        <h3>You are not authorised to visit this page.</h3>
      </div>
    </>
  );
};
