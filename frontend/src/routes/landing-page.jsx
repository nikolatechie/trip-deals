import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import { getCurrentDate } from "../helpers/date";
import styles from "../styles/form.module.css";

export default function LandingPage() {
  const [destination, setDestination] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [maxPrice, setMaxPrice] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:80/api/trip_deals.php/?destination=${destination}&fromDate=${fromDate}&toDate=${toDate}&travelers=${travelers}&maxPrice=${maxPrice}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data.deals);
      } else {
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
          <label htmlFor='fromDate'>From</label>
          <input
            className={styles.field}
            id='fromDate'
            type='date'
            required
            value={fromDate}
            min={currentDate}
            onChange={(e) => setfromDate(e.target.value)}
          />
          <label htmlFor='toDate'>To</label>
          <input
            className={styles.field}
            id='toDate'
            type='date'
            required
            value={toDate}
            min={fromDate === "" ? currentDate : fromDate}
            onChange={(e) => settoDate(e.target.value)}
          />
          <label htmlFor='travelers'>Number of Travelers</label>
          <input
            className={styles.field}
            id='travelers'
            type='number'
            min={1}
            max={20}
            required
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
