import axios from "axios";

const axiosPost = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosPost.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response.data.error.message);
  }
);

axiosPost.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.data.error.message === "Unauthenticated.") {
        localStorage.clear();

        setTimeout(() => {
          window.location.replace("/login");
        }, 100);
      }

      throw new Error(error.response.data.error.message);
    } else if (error.request) {
      console.error("Request error", error.request);
    } else {
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosPost;
