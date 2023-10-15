import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import DealCard from "../components/DealCard";
import { fetchBookings } from "../services/dealService";
import styles from "../styles/deal-card.module.css";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      const response = await fetchBookings();
      if (response.errorMessage) {
        alert(response.errorMessage);
      } else {
        setBookings(response.bookings);
      }
    };
    fetchAllBookings();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {bookings.length === 0 ? (
          <h2>You have no bookings!</h2>
        ) : (
          <>
            <h2 className={styles.dealsTitle}>
              We found {bookings.length}{" "}
              {bookings.length === 1 ? "booking!" : "bookings!"}
            </h2>
          </>
        )}
        <div className={styles.cardContainer}>
          {bookings.map((booking) => (
            <DealCard
              key={booking.id}
              destination={booking.destination}
              fromDate={booking.from_date}
              toDate={booking.to_date}
              price={booking.total_cost}
              travelers={booking.travelers}
              booked
            />
          ))}
        </div>
      </div>
    </>
  );
}
