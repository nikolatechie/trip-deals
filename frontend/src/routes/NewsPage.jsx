import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NewsArticle from "../components/NewsArticle";
import { sanitiseDateTime } from "../helpers/date";
import { fetchNewsArticles } from "../services/newsService";
import styles from "../styles/news-articles.module.css";

export default function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetchNewsArticles();
      setLoading(false);
      if (response.errorMessage) {
        alert(response.errorMessage);
      } else {
        setArticles(response.articles);
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
