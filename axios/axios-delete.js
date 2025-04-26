import axios from "axios";

const axiosDelete = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosDelete.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosDelete.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data?.error?.message || "An error occurred";

      if (errorMessage === "Unauthenticated.") {
        localStorage.clear();
        setTimeout(() => {
          window.location.replace("/login");
        }, 100);
      }

      return Promise.reject(errorMessage);
    } else if (error.request) {
      console.error("Request error", error.request);
      return Promise.reject("No response received from server");
    } else {
      console.error("Error", error.message);
      return Promise.reject(error.message);
    }
  }
);

export default axiosDelete;
