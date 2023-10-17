import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminSignedIn } from "../helpers/auth.js";
import { API_URL } from "../config/backendConfig.js";
import styles from "../styles/news-articles.module.css";

export default function NewsArticle(props) {
  const navigate = useNavigate();
  const [adminSignedIn, setAdminSignedIn] = useState(false);

  useEffect(() => {
    setAdminSignedIn(isAdminSignedIn());
  }, []);

  const handleEdit = () => {
    const data = {
      id: props.id,
      title: props.title,
      description: props.description,
      imgName: props.imgName,
    };
    const dataParam = encodeURIComponent(JSON.stringify(data));
    navigate(`/edit-article/?data=${dataParam}`);
  };

  return (
    <article>
      <div className={styles.articleHeader}>
        <a href={props.url}>
          <img
            className={styles.articleImg}
            src={`${API_URL}/article_image/?img_name=${props.imgName}`}
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
