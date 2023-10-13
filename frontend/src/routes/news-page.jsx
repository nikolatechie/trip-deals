import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import styles from "../styles/news-articles.module.css";
import NewsArticle from "../components/news-article";

const sanitiseDateTime = (dateTime) => {
  const split = dateTime.split(" ");
  return split.slice(0, 4).join(" ") + " at " + split[4].substr(0, 5);
};

export default function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "http://localhost:80/api/travel_news.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
