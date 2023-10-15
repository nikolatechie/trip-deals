import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "../styles/form.module.css";

export default function EditDealPage() {
  const navigate = useNavigate();
  const [deal, setDeal] = useState({
    id: -1,
    destination: "",
    fromDate: "",
    toDate: "",
    price: 0.0,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const dataParam = searchParams.get("data");
    if (dataParam) {
      const parsedData = JSON.parse(decodeURIComponent(dataParam));
      setDeal(parsedData);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:80/api/trip_deals.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deal.id,
          destination: deal.destination,
          fromDate: deal.fromDate,
          toDate: deal.toDate,
          price: deal.price,
        }),
      });

      if (response.ok) {
        alert("The deal has been updated successfully!");
      } else {
        const data = await response.json();
        alert(data.errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      const response = await fetch("http://localhost:80/api/trip_deals.php", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deal.id,
        }),
      });

      if (response.ok) {
        navigate(-1);
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
      {deal === undefined ? (
        <h2>Invalid data!</h2>
      ) : (
        <div className={styles.content}>
          <h1 className={styles.title}>Update deal</h1>
          <form>
            <label htmlFor='destination'>Destination (City or Country)</label>
            <input
              className={styles.field}
              id='destination'
              type='text'
              minLength={5}
              maxLength={200}
              required
              placeholder='Destination (City or Country)'
              value={deal.destination}
              onChange={(e) =>
                setDeal({
                  ...deal,
                  destination: e.target.value,
                })
              }
            />
            <label htmlFor='fromDate'>From</label>
            <input
              className={styles.field}
              id='fromDate'
              type='date'
              required
              value={deal.fromDate}
              onChange={(e) =>
                setDeal({
                  ...deal,
                  fromDate: e.target.value,
                })
              }
            />
            <label htmlFor='toDate'>To</label>
            <input
              className={styles.field}
              id='toDate'
              type='date'
              required
              value={deal.toDate}
              onChange={(e) =>
                setDeal({
                  ...deal,
                  toDate: e.target.value,
                })
              }
            />
            <label htmlFor='price'>Price per Person (£)</label>
            <input
              className={styles.field}
              id='price'
              type='number'
              min={0}
              step={0.1}
              required
              value={deal.price}
              onChange={(e) =>
                setDeal({
                  ...deal,
                  price: e.target.value,
                })
              }
            />
            <div className={styles.btnContainer}>
              <button className={styles.btn} onClick={handleUpdate}>
                Update
              </button>
              <button className={styles.dangerBtn} onClick={handleDelete}>
                Remove
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
