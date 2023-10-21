import { API_URL } from "../config/backendConfig.js";
import { API_PATH } from "../data/constants.js";

export const fetchHomePageData = async () => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.HOME}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      return { deals: data.deals, articles: data.articles };
    } else {
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
};
