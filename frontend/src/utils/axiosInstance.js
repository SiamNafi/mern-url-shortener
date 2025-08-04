import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    // If response is successful
    return response;
  },
  (error) => {
    // Handle error globally
    if (error.response) {
      // Server responded with status other than 2xx
      console.error(
        "API Error:",
        error.response.data.message || "Something went wrong"
      );
    } else if (error.request) {
      // No response from server
      console.error("Network Error: No response from server");
    } else {
      // Something else happened
      console.error("Unexpected Error:", error.message);
    }

    // Optionally, you can return a custom error object
    return Promise.reject(
      error.response?.data || {
        message: "Something went wrong, please try again.",
      }
    );
  }
);

export default axiosInstance;
