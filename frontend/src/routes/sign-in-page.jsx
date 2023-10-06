import React, { useState } from "react";
import { NavBar } from "../components/navbar";
import "../styles/sign-in-page.css";

export default function SignInPage() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:80/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: state.username,
          password: state.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        alert(data.errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
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
              onChange={(e) => setState({ ...state, username: e.target.value })}
            />
          </div>
          <div className='password-container'>
            <label htmlFor='password'>Password</label>
            <input
              className='field'
              type='password'
              id='password'
              onChange={(e) => setState({ ...state, password: e.target.value })}
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
