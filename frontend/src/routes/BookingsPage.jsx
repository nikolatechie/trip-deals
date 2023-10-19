import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import DealCard from "../components/DealCard";
import { fetchBookings } from "../services/dealService";
import { isAdminSignedIn } from "../helpers/auth";
import styles from "../styles/deal-card.module.css";

const adminSignedIn = isAdminSignedIn();

export default function BookingsPage() {
  const [userBookings, setUserBookings] = useState([]);
  const [otherBookings, setOtherBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      const response = await fetchBookings();
      if (response.errorMessage) {
        alert(response.errorMessage);
      } else {
        setUserBookings(response.userBookings);
        if (adminSignedIn) {
          setOtherBookings(response.otherBookings);
        }
      }
    };
    fetchAllBookings();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {userBookings.length === 0 ? (
          <h2>You have no bookings!</h2>
        ) : (
          <>
            <h2 className={styles.dealsTitle}>
              You have {userBookings.length}{" "}
              {userBookings.length === 1 ? "booking!" : "bookings!"}
            </h2>
          </>
        )}
        <div className={styles.cardContainer}>
          {userBookings.map((booking) => (
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
        {adminSignedIn && (
          <>
            <br />
            <br />
            <h2 className={styles.dealsTitle}>
              We found {otherBookings.length} other{" "}
              {otherBookings.length === 1 ? "booking." : "bookings!"}
            </h2>
            <div className={styles.cardContainer}>
              {otherBookings.map((booking) => (
                <DealCard
                  key={booking.id}
                  userId={booking.user_id}
                  destination={booking.destination}
                  fromDate={booking.from_date}
                  toDate={booking.to_date}
                  price={booking.total_cost}
                  travelers={booking.travelers}
                  booked
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
