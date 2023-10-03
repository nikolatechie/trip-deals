import React from "react";
import { NavBar } from "../components/navbar";
import "../styles/error-page.css";

export const ErrorPage = () => {
  return (
    <>
      <NavBar />
      <div className='content'>
        <h1>Error 404: Not Found</h1>
        <h3>The requested page doesn't exist.</h3>
      </div>
    </>
  );
};
