import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import DealCard from "../components/deal-card";
import styles from "../styles/deal-card.module.css";

const fetchDeals = async (formData) => {
  try {
    const response = await fetch(
      `http://localhost:80/api/trip_deals.php/?destination=${formData.destination}&fromDate=${formData.fromDate}&toDate=${formData.toDate}&travelers=${formData.travelers}&maxPrice=${formData.maxPrice}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      return data.deals;
    } else {
      alert(data.errorMessage);
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }

  return [];
};

export default function ShowDealsPage() {
  const [travelers, setTravelers] = useState(1);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const setFetchedDeals = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const dataParam = searchParams.get("data");
      if (dataParam) {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        setTravelers(parsedData.travelers);
        const fetchedDeals = await fetchDeals(parsedData);
        setDeals(fetchedDeals);
      }
    };
    setFetchedDeals();
  }, []);

  return (
    <>
      <NavBar />

      <div className={styles.container}>
        {deals.length === 0 ? (
          <h2>No deals match the criteria!</h2>
        ) : (
          <>
            <h2 className={styles.dealsTitle}>
              We found {deals.length} {deals.length === 1 ? "deal" : "deals"}{" "}
              for you!
            </h2>
            <div className={styles.cardContainer}>
              {deals.map((deal) => (
                <DealCard
                  key={deal.id}
                  id={deal.id}
                  destination={deal.destination}
                  fromDate={deal.fromDate}
                  toDate={deal.toDate}
                  travelers={travelers}
                  price={deal.pricePerDay}
                ></DealCard>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
