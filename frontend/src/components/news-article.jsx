import React from "react";
import styles from "../styles/news-articles.module.css";

export const NewsArticle = (props) => {
  return (
    <article>
      <h2>
        <a href={props.url}>{props.title}</a>
      </h2>
      <p>
        {props.pubDate} | {props.creator}
      </p>
      <p>{props.description}</p>
    </article>
  );
};
