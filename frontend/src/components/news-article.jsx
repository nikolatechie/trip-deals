import React from "react";
import styles from "../styles/news-articles.module.css";

export default function NewsArticle(props) {
  return (
    <article>
      <div className={styles.articleHeader}>
        <a href={props.url}>
          <img
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
    </article>
  );
}
