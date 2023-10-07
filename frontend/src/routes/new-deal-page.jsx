import React, { useState } from "react";
import NavBar from "../components/navbar";
import styles from "../styles/form.module.css";

export default function NewDealPage() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(100.0);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:80/api/trip_deals.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          price,
        }),
      });

      if (response.ok) {
        alert("The deal has been saved successfully!");
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
        <h1 className={styles.title}>New deal</h1>
        <form onSubmit={handleAdd}>
          <label htmlFor='destination'>Destination (City or Country)</label>
          <input
            className={styles.field}
            id='destination'
            type='text'
            minLength={5}
            maxLength={200}
            required
            placeholder='Destination (City or Country)'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <label htmlFor='startDate'>From</label>
          <input
            className={styles.field}
            id='startDate'
            type='date'
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor='endDate'>To</label>
          <input
            className={styles.field}
            id='endDate'
            type='date'
            required
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
            required
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
