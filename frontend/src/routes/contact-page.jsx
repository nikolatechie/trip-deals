import React, { useState } from "react";
import NavBar from "../components/navbar";
import styles from "../styles/form.module.css";

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    alert("click");
  };

  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <h1 className={styles.title}>Contact</h1>
        <form onSubmit={handleSend}>
          <label htmlFor='subject'>Subject</label>
          <input
            className={styles.field}
            id='subject'
            type='text'
            minLength={3}
            maxLength={50}
            placeholder='Enter email subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
          <input
            className={styles.field}
            id='email'
            type='email'
            minLength={5}
            maxLength={80}
            placeholder='Your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            minLength={20}
            maxLength={1000}
            placeholder='Enter your message'
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={styles.submitContainer}>
            <button type='submit'>Send</button>
          </div>
        </form>
      </div>
    </>
  );
}
