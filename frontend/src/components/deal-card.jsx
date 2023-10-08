import React from "react";
import styles from "../styles/deal-card.module.css";

export const DealCard = (props) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{props.destination}</h3>
      <div className={styles.dates}>
        <h4>From {props.fromDate}</h4>
        <h4>To {props.toDate}</h4>
      </div>
      <h3 className={styles.price}>£{props.travelers * props.price}/day</h3>
      <div className={styles.btnContainer}>
        <button className={styles.btnCard} onClick={() => alert("Booked!")}>
          Book
        </button>
      </div>
    </div>
  );
};
