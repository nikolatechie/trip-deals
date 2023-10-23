import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { bookDeal } from "../services/dealService";
import { PATH } from "../data/constants.js";
import { getDiffDays } from "../helpers/date.js";
import styles from "../styles/form.module.css";

export default function BookDealPage() {
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [booking, setBooking] = useState({
    id: undefined,
    destination: "",
    fromDate: "",
    toDate: "",
    travelers: 1,
    price: 0.0,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const dataParam = searchParams.get("data");
    if (dataParam) {
      const parsedData = JSON.parse(decodeURIComponent(dataParam));
      setMinDate(parsedData.fromDate);
      setMaxDate(parsedData.toDate);
      setBooking(parsedData);
    }
  }, []);

  useEffect(() => {
    // Update total price
    const days = getDiffDays(
      new Date(booking.fromDate),
      new Date(booking.toDate)
    );
    const total = booking.travelers * days * booking.price;
    setTotalPrice(total > 0.0 ? total : 0.0);
  }, [booking.fromDate, booking.toDate, booking.travelers, booking.price]);

  const confirmBooking = async (e) => {
    e.preventDefault();
    if (!window.confirm("Click OK to confirm your booking!")) {
      return;
    }
    const response = await bookDeal({
      id: booking.id,
      fromDate: booking.fromDate,
      toDate: booking.toDate,
      travelers: booking.travelers,
    });
    if (response.errorMessage) {
      alert(response.errorMessage);
    } else {
      alert("The trip has been booked successfully!");
      navigate(PATH.BOOKINGS_PAGE);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <h1 className={styles.title}>Complete your booking</h1>
        <form onSubmit={confirmBooking}>
          <label htmlFor='destination'>Destination (City or Country)</label>
          <input
            className={styles.field}
            id='destination'
            type='text'
            minLength={5}
            maxLength={200}
            required
            disabled
            placeholder='Destination (City or Country)'
            value={booking.destination}
          />
          <label htmlFor='fromDate'>From</label>
          <input
            className={styles.field}
            id='fromDate'
            type='date'
            required
            value={booking.fromDate}
            min={minDate}
            max={maxDate}
            onChange={(e) =>
              setBooking({ ...booking, fromDate: e.target.value })
            }
          />
          <label htmlFor='toDate'>To</label>
          <input
            className={styles.field}
            id='toDate'
            type='date'
            required
            value={booking.toDate}
            min={booking.fromDate === "" ? minDate : booking.fromDate}
            max={maxDate}
            onChange={(e) => setBooking({ ...booking, toDate: e.target.value })}
          />
          <label htmlFor='price'>Total Daily Price (£)</label>
          <input
            className={styles.field}
            id='price'
            type='number'
            min={0}
            step={0.1}
            required
            disabled
            value={parseFloat(booking.price * booking.travelers).toFixed(2)}
          />
          <label htmlFor='travelers'>Travelers</label>
          <input
            className={styles.field}
            id='travelers'
            type='number'
            min={1}
            minLength={1}
            max={10}
            required
            value={booking.travelers}
            onChange={(e) =>
              setBooking({
                ...booking,
                travelers:
                  e.target.value.length > 0 ? parseInt(e.target.value) : 1,
              })
            }
          />
          <h2>Total Price: £{parseFloat(totalPrice).toFixed(2)}</h2>
          <div className={styles.btnContainer}>
            <button className={styles.btn} type='submit'>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
