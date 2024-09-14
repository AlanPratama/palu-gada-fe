import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url.includes("login") || config.url.includes("create-admin")) {
      return config;
    }

    (error) => {
      console.error("axiosInstance.interceptors.request Error:", error.message);
      return Promise.reject(error);
    };
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    console.error("axiosInstance.interceptors.request Error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
