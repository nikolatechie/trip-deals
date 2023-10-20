import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { PATH } from "../data/constants";
import { register } from "../services/authService";
import styles from "../styles/form.module.css";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register({
      username: state.username,
      password: state.password,
      repeatPassword: state.repeatPassword,
    });
    if (response.errorMessage) {
      alert(response.errorMessage);
    } else {
      alert("Registration is successful!");
      navigate(PATH.SIGN_IN_PAGE);
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Register</h1>
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
          <div className={styles.passwordContainer}>
            <label htmlFor='repeatPassword'>Repeat password</label>
            <input
              className={styles.field}
              type='password'
              minLength={5}
              maxLength={40}
              required
              id='repeatPassword'
              onChange={(e) =>
                setState({ ...state, repeatPassword: e.target.value })
              }
            />
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btn} type='submit'>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
