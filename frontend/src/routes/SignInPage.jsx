import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "../styles/form.module.css";
import { signIn } from "../services/authService";

export default function SignInPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn({
      username: state.username,
      password: state.password,
    });
    if (response.errorMessage) {
      alert(response.errorMessage);
    } else {
      localStorage.setItem("username", state.username);
      localStorage.setItem("role", response.role);
      navigate("/");
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Sign in</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              className={styles.field}
              type='text'
              minLength={4}
              maxLength={30}
              required
              id='username'
              onChange={(e) => setState({ ...state, username: e.target.value })}
            />
          </div>
          <div className={styles.passwordContainer}>
            <label htmlFor='password'>Password</label>
            <input
              className={styles.field}
              type='password'
              minLength={5}
              maxLength={40}
              required
              id='password'
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btn} type='submit'>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
