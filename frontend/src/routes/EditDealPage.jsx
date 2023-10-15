import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { removeDeal, updateDeal } from "../services/dealService";
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
    const response = await updateDeal({
      id: deal.id,
      destination: deal.destination,
      fromDate: deal.fromDate,
      toDate: deal.toDate,
      price: deal.price,
    });
    if (response.errorMessage) {
      alert(response.errorMessage);
    } else {
      alert("The deal has been updated successfully!");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure?")) {
      return;
    }
    const response = await removeDeal(deal.id);
    if (response.errorMessage) {
      alert(response.errorMessage);
    } else {
      navigate(-1);
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
