import React, { useState } from "react";
import NavBar from "../components/navbar";
import styles from "../styles/form.module.css";

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:80/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          email,
          message,
        }),
      });

      if (response.ok) {
        alert("The message has been sent successfully!");
      } else {
        const data = await response.json();
        alert(data.errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
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
            required
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
            required
            placeholder='Your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            minLength={20}
            maxLength={1000}
            required
            placeholder='Enter your message'
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={styles.btnContainer}>
            <button className={styles.btn} type='submit'>
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
