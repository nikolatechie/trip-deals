import { API_URL } from "../config/backendConfig.js";
import { API_PATH } from "../data/constants.js";

export const bookDeal = async (body) => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.TRIP_BOOKING}`, {
      method: "POST",
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

export const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.TRIP_BOOKING}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      return {
        userBookings: data.userBookings,
        otherBookings: data.otherBookings,
      };
    } else {
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
};

export const fetchDeals = async (formData) => {
  try {
    const response = await fetch(
      `${API_URL}${API_PATH.TRIP_DEALS}/?destination=${formData.destination}&fromDate=${formData.fromDate}&toDate=${formData.toDate}&travelers=${formData.travelers}&maxPrice=${formData.maxPrice}&displayAll=${formData.displayAll}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      return { deals: data.deals };
    } else {
      return { errorMessage: data.errorMessage };
    }
  } catch (error) {
    console.log(error);
    return { errorMessage: error };
  }
};

export const createDeal = async (body) => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.TRIP_DEALS}`, {
      method: "POST",
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

export const updateDeal = async (body) => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.TRIP_DEALS}`, {
      method: "PUT",
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

export const removeDeal = async (id) => {
  try {
    const response = await fetch(`${API_URL}${API_PATH.TRIP_DEALS}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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
