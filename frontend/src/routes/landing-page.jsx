import React, { useState } from "react";
import NavBar from "../components/navbar";
import styles from "../styles/form.module.css";

export default function LandingPage() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [travelers, setTravelers] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100);

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
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          />
          <label htmlFor='price'>Max Total Price (£)</label>
          <input
            className={styles.field}
            id='price'
            type='number'
            min={0}
            step={0.1}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <div className={styles.submitContainer}>
            <button type='submit'>Search</button>
          </div>
        </form>
      </div>
    </>
  );
}
