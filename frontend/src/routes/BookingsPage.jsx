import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import DealCard from "../components/DealCard";
import styles from "../styles/deal-card.module.css";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:80/api/trip_booking.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setBookings(data.bookings);
        } else {
          alert(data.errorMessage);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchBookings();
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
