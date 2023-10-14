import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import DealCard from "../components/deal-card";
import NewsArticle from "../components/news-article";
import { sanitiseDateTime } from "../helpers/date";
import styles from "../styles/landing-page.module.css";

export default function LandingPage() {
  const [deals, setDeals] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:80/api/landing_page.php`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setDeals(data.deals);
          setArticles(data.articles);
        } else {
          alert(data.errorMessage);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <div>
          <h1>Thinking about holiday?</h1>
          <h2>Find the best deals on our website!</h2>
        </div>
        <div className={styles.deals}>
          {deals.map((deal) => (
            <div key={deal.id}>
              <DealCard
                id={deal.id}
                destination={deal.destination}
                fromDate={deal.from_date}
                toDate={deal.to_date}
                travelers={1}
                price={deal.price_per_day}
              />
            </div>
          ))}
        </div>
        <div className={styles.articles}>
          {articles.map((article) => (
            <div key={article.id}>
              <NewsArticle
                id={article.id}
                title={article.title}
                description={article.description}
                imgName={article.img_name}
                url={article.url}
                pubDate={sanitiseDateTime(article.pub_date)}
                creator={article.creator}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
