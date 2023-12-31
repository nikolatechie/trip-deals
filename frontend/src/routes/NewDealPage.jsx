import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { createDeal } from "../services/dealService";
import styles from "../styles/form.module.css";

export default function NewDealPage() {
  const [destination, setDestination] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [price, setPrice] = useState(100.0);

  const handleAdd = async (e) => {
    e.preventDefault();
    const response = await createDeal({
      destination,
      fromDate,
      toDate,
      price,
    });
    if (response.errorMessage) {
      alert(response.errorMessage);
    } else {
      alert("The deal has been saved successfully!");
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
          <label htmlFor='fromDate'>From</label>
          <input
            className={styles.field}
            id='fromDate'
            type='date'
            required
            value={fromDate}
            onChange={(e) => setfromDate(e.target.value)}
          />
          <label htmlFor='toDate'>To</label>
          <input
            className={styles.field}
            id='toDate'
            type='date'
            required
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
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
          <div className={styles.btnContainer}>
            <button className={styles.btn} type='submit'>
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
