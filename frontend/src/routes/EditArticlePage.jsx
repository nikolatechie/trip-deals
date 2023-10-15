import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  removeArticle,
  saveArticleImage,
  updateNewsArticle,
} from "../services/newsService";
import styles from "../styles/form.module.css";

export default function EditArticlePage() {
  const navigate = useNavigate();
  const [article, setArticle] = useState(undefined);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const dataParam = searchParams.get("data");
    if (dataParam) {
      const parsedData = JSON.parse(decodeURIComponent(dataParam));
      setArticle(parsedData);
    }
  }, []);

  const handleSelectImage = (e) => {
    const img = e.target.files[0];
    if (img && img.type.startsWith("image/")) {
      setArticle({ ...article, selectedImage: img });
    } else {
      alert("Please select an image!");
    }
  };

  const saveImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await saveArticleImage(formData);
    if (response.errorMessage) {
      alert(response.errorMessage);
      return null;
    } else {
      return response.imgName;
    }
  };

  const updateArticle = async (imgName) => {
    const body = {
      id: article.id,
      title: article.title,
      description: article.description,
    };

    if (imgName !== null) {
      body["oldImage"] = article.imgName;
      body["newImage"] = imgName;
    }

    const response = await updateNewsArticle(body);
    if (response.errorMessage) {
      alert(response.errorMessage);
    } else {
      alert("The article has been updated successfully!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Save an image if it's been selected
    let imgName = null;
    if (article.selectedImage !== undefined) {
      imgName = await saveImage(article.selectedImage);
    }

    // Update article in the database AND remove the previous image
    updateArticle(imgName);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure?")) {
      return;
    }
    const response = await removeArticle({
      id: article.id,
      imgName: article.imgName,
    });
    if (response.errorMessage) {
      alert(response.errorMessage);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <NavBar />
      {article === undefined ? (
        <h2>Invalid data!</h2>
      ) : (
        <div className={styles.content}>
          <h1 className={styles.title}>Edit article</h1>
          <form>
            <label htmlFor='title'>Title</label>
            <input
              className={styles.field}
              id='title'
              type='text'
              minLength={4}
              maxLength={400}
              required
              placeholder='Title'
              value={article.title}
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
            />
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              minLength={4}
              maxLength={1000}
              required
              placeholder='Description'
              rows={5}
              value={article.description}
              onChange={(e) =>
                setArticle({ ...article, description: e.target.value })
              }
            />
            <div className={styles.fileUpload}>
              <label htmlFor='image'>Select an image</label>
              <input id='image' type='file' onChange={handleSelectImage} />
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.btn} onClick={handleUpdate}>
                Update
              </button>
              <button className={styles.dangerBtn} onClick={handleDelete}>
                Remove
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
