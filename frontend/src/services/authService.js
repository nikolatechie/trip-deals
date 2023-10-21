import { API_URL } from "../config/backendConfig.js";
import { API_PATH } from "../data/constants.js";

export const register = async (body) => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.REGISTRATION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
};

export const signIn = async (body) => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.SIGN_IN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
      return { role: data.role };
    } else {
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
};

export const signOut = async () => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.SIGN_OUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
  return true;
};
