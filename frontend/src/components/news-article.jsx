import React, { useEffect, useState } from "react";
import { isAdminSignedIn } from "../auth/auth.js";
import styles from "../styles/news-articles.module.css";

export default function NewsArticle(props) {
  const [adminSignedIn, setAdminSignedIn] = useState(false);

  useEffect(() => {
    setAdminSignedIn(isAdminSignedIn());
  }, []);

  const handleEdit = () => {
    alert("click");
  };

  return (
    <article>
      <div className={styles.articleHeader}>
        <a href={props.url}>
          <img
            className={styles.articleImg}
            src={`http://localhost:80/api/article_image.php/?img_name=${props.imgName}`}
            alt={props.title}
          />
        </a>
        <div>
          <h1>
            <a href={props.url}>{props.title}</a>
          </h1>
          <p>
            {props.pubDate} | {props.creator}
          </p>
        </div>
      </div>
      <p>{props.description}</p>
      {adminSignedIn && (
        <div className={styles.btnContainer}>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </article>
  );
}
