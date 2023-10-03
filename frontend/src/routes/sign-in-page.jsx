import React from "react";
import { NavBar } from "../components/navbar";
import "../styles/sign-in-page.css";

export const SignInPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("now");
  };

  return (
    <div>
      <NavBar />
      <div className='container'>
        <div className='title'>
          <h2>Admin sign in</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input className='field' type='text' id='username' />
          </div>
          <div className='password-container'>
            <label htmlFor='password'>Password</label>
            <input className='field' type='password' id='password' />
          </div>
          <div className='submit-container'>
            <input type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
};
