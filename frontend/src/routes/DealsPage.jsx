import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getCurrentDate } from "../helpers/date";
import styles from "../styles/form.module.css";

export default function DealsPage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [maxPrice, setMaxPrice] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  const showDeals = (displayAll) => {
    const data = {
      destination,
      fromDate,
      toDate,
      travelers,
      maxPrice,
    };
    data["displayAll"] = displayAll;
    const dataParam = encodeURIComponent(JSON.stringify(data));
    navigate(`/show-deals/?data=${dataParam}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    showDeals(false);
  };

  const showAll = (e) => {
    e.preventDefault();
    showDeals(true);
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
            onChange={(e) => setToDate(e.target.value)}
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
            onChange={(e) => setTravelers(parseInt(e.target.value))}
          />
          <label htmlFor='price'>Max Total Price (£)</label>
          <input
            className={styles.field}
            id='price'
            type='number'
            min={0}
            step={0.1}
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          />
          <div className={styles.btnContainer}>
            <button type='submit'>Search</button>
            <button onClick={(e) => showAll(e)}>Show all</button>
          </div>
        </form>
      </div>
    </>
  );
}
