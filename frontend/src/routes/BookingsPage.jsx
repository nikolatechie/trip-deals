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

  const exportBookingsAsJson = () => {
    const blob = new Blob([JSON.stringify(userBookings)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_bookings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {userBookings.length === 0 ? (
          <h2>You have no bookings!</h2>
        ) : (
          <div className={styles.bookingsTitleContainer}>
            <h2>
              You have {userBookings.length}{" "}
              {userBookings.length === 1 ? "booking!" : "bookings!"}
            </h2>
            <button onClick={exportBookingsAsJson}>Export as JSON</button>
          </div>
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
