import React, { useState } from "react";
import NavBar from "../components/navbar";
import styles from "../styles/form.module.css";

export default function NewDealPage() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(100.0);

  const handleAdd = (e) => {
    e.preventDefault();
    alert(destination);
  };

  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <h1 className={styles.title}>New deal</h1>
        <form onSubmit={handleAdd}>
          <label htmlFor='destination'>Destination (City or Country)</label>
          <input
            className={styles.field}
            id='destination'
            type='text'
            minLength={5}
            maxLength={200}
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
          <label htmlFor='price'>Price per Person (£)</label>
          <input
            className={styles.field}
            id='price'
            type='number'
            min={0}
            step={0.1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className={styles.submitContainer}>
            <button type='submit'>Add</button>
          </div>
        </form>
      </div>
    </>
  );
}
