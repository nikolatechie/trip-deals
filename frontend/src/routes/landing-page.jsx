import React, { useState } from "react";
import NavBar from "../components/navbar";
import styles from "../styles/landing-page.module.css";

export const LandingPage = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(undefined);
  const [travelers, setTravelers] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(destination + " " + travelers);
  };

  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <h1 className={styles.title}>Find the best deals!</h1>
        <form onSubmit={handleSearch}>
          <label htmlFor='destination'>Destination (City or Country)</label>
          <input
            className={styles.field}
            id='destination'
            type='text'
            placeholder='Destination (City or Country)'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <label htmlFor='startDate'>From</label>
          <input
            className={styles.field}
            id='startDate'
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor='endDate'>To</label>
          <input
            className={styles.field}
            id='endDate'
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label htmlFor='travelers'>Number of Travelers</label>
          <input
            className={styles.field}
            id='travelers'
            type='number'
            min={1}
            max={20}
            placeholder='Number of Travelers'
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          />
          <div className={styles.submitContainer}>
            <button type='submit'>Search</button>
          </div>
        </form>
      </div>
    </>
  );
};
