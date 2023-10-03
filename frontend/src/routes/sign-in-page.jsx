import React, { useState } from "react";
import { NavBar } from "../components/navbar";
import "../styles/sign-in-page.css";

export default function SignInPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Request
    console.log(data);
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
            <input
              className='field'
              type='text'
              id='username'
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div className='password-container'>
            <label htmlFor='password'>Password</label>
            <input
              className='field'
              type='password'
              id='password'
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className='submit-container'>
            <input type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
}
