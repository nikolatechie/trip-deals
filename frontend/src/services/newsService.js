import { API_URL_BASE } from "../data/constants";

export const saveArticleImage = async (formData) => {
  try {
    const response = await fetch(`${API_URL_BASE}/article_image.php`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      return { imgName: data.imgName };
    } else {
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
};

export const fetchNewsArticles = async () => {
  try {
    const response = await fetch(`${API_URL_BASE}/travel_news.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      return { articles: data.articles };
    } else {
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
};

export const updateNewsArticle = async (body) => {
  try {
    const response = await fetch(`${API_URL_BASE}/travel_news.php`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
  return true;
};

export const createArticle = async (formData) => {
  try {
    const response = await fetch(`${API_URL_BASE}/travel_news.php`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
  return true;
};

export const removeArticle = async (body) => {
  try {
    const response = await fetch(`${API_URL_BASE}/travel_news.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
  return true;
};
