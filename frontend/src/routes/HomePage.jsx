import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import DealCard from "../components/DealCard";
import NewsArticle from "../components/NewsArticle";
import { sanitiseDateTime } from "../helpers/date";
import { fetchHomePageData } from "../services/homeService";
import styles from "../styles/home-page.module.css";

export default function HomePage() {
  const [deals, setDeals] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchHomePageData();
      if (response.errorMessage) {
        alert(response.errorMessage);
      } else {
        setDeals(response.deals);
        setArticles(response.articles);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.title}>
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
