import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { API_URL_BASE } from "../data/constants";
import styles from "../styles/form.module.css";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (e) => {
    const img = e.target.files[0];
    if (img && img.type.startsWith("image/")) {
      setSelectedImage(img);
    } else {
      alert("Please select an image!");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", selectedImage);

    try {
      const response = await fetch(`${API_URL_BASE}/travel_news.php`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("The article has been saved successfully!");
      } else {
        const data = await response.json();
        alert(data.errorMessage);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.content}>
        <h1 className={styles.title}>New article</h1>
        <form onSubmit={handleAdd}>
          <label htmlFor='title'>Title</label>
          <input
            className={styles.field}
            id='title'
            type='text'
            minLength={4}
            maxLength={400}
            required
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            minLength={4}
            maxLength={1000}
            required
            placeholder='Description'
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={styles.fileUpload}>
            <label htmlFor='image'>Select an image</label>
            <input
              id='image'
              type='file'
              required
              onChange={handleSelectImage}
            />
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btn} type='submit'>
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
