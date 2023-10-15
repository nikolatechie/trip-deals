import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/form.module.css";
import { isAdminSignedIn } from "../helpers/auth";

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [adminSignedIn, setAdminSignedIn] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:80/api/contact.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setMessages(data.messages);
        } else {
          alert(data.errorMessage);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    setAdminSignedIn(isAdminSignedIn());
    if (adminSignedIn) {
      fetchMessages();
    }
  }, [adminSignedIn]);

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
        if (adminSignedIn) {
          window.location.reload();
        }
      } else {
        const data = await response.json();
        alert(data.errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:80/api/contact.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (response.ok) {
        setMessages(messages.filter((message) => message.id !== id));
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
            rows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={styles.btnContainer}>
            <button className={styles.btn} type='submit'>
              Send
            </button>
          </div>
        </form>
        {adminSignedIn && (
          <div className={styles.bottomContainer}>
            <table className={styles.contactTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, i) => (
                  <tr key={i}>
                    <td>{msg.id}</td>
                    <td>{msg.subject}</td>
                    <td>
                      <a href={"mailto:" + msg.email}>{msg.email}</a>
                    </td>
                    <td>{msg.message}</td>
                    <td>
                      <button
                        className={styles.dangerBtn}
                        onClick={() => remove(msg.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
