import axios from "axios";

const axiosGet = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosGet.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosGet.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("HTTP error", error.response.status, error.response.data);

      if (error.response.data.error.message === "Unauthenticated.") {
        localStorage.clear();

        setTimeout(() => {
          window.location.replace("/login");
        }, 100);
      }
    } else if (error.request) {
      console.error("Request error", error.request);
    } else {
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosGet;
