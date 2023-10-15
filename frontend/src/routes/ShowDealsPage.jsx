import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import DealCard from "../components/DealCard";
import { API_URL_BASE } from "../data/constants";
import styles from "../styles/deal-card.module.css";

const fetchDeals = async (formData) => {
  try {
    const response = await fetch(
      `${API_URL_BASE}/trip_deals.php/?destination=${formData.destination}&fromDate=${formData.fromDate}&toDate=${formData.toDate}&travelers=${formData.travelers}&maxPrice=${formData.maxPrice}&displayAll=${formData.displayAll}`,
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
                <div key={deal.id}>
                  <DealCard
                    id={deal.id}
                    destination={deal.destination}
                    fromDate={deal.from_date}
                    toDate={deal.to_date}
                    travelers={travelers}
                    price={deal.price_per_day}
                  ></DealCard>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
