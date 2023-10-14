import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ROLE, getUserRole } from "../auth/auth";
import styles from "../styles/deal-card.module.css";

export default function DealCard(props) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(USER_ROLE.UNAUTHENTICATED);

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const handleBook = () => {
    navigate(`/book-deal/?data=${encodeURIComponent(JSON.stringify(props))}`);
  };

  const handleEdit = () => {
    const data = {
      id: props.id,
      destination: props.destination,
      fromDate: props.fromDate,
      toDate: props.toDate,
      price: props.price,
    };
    const dataParam = encodeURIComponent(JSON.stringify(data));
    navigate(`/edit-deal/?data=${dataParam}`);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{props.destination}</h3>
      <div className={styles.dates}>
        <h4>From {props.fromDate}</h4>
        <h4>To {props.toDate}</h4>
      </div>
      <h3 className={styles.price}>
        £{(props.travelers * props.price).toFixed(2)}/day
      </h3>
      <div className={styles.btnContainer}>
        {userRole !== USER_ROLE.UNAUTHENTICATED && (
          <button className={styles.bookBtn} onClick={handleBook}>
            Book
          </button>
        )}
        {userRole === USER_ROLE.ADMIN && (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
}
