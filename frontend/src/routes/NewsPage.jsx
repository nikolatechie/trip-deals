import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NewsArticle from "../components/NewsArticle";
import { sanitiseDateTime } from "../helpers/date";
import { API_URL_BASE } from "../data/constants";
import styles from "../styles/news-articles.module.css";

export default function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_URL_BASE}/travel_news.php`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setLoading(false);

        if (response.ok) {
          setArticles(data.articles);
        } else {
          alert(data.errorMessage);
        }
      } catch (error) {
        setLoading(true);
        console.log(error);
        alert(error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {loading ? (
          <h2>Loading...</h2>
        ) : articles.length === 0 ? (
          <h2>No articles found</h2>
        ) : (
          <>
            {articles.map((article) => (
              <NewsArticle
                key={article.id}
                id={article.id}
                title={article.title}
                description={article.description}
                url={article.url}
                creator={article.creator}
                pubDate={sanitiseDateTime(article.pub_date)}
                imgName={article.img_name}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
