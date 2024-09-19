import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../redux/auth/authSlice";
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (
      config.url.includes("login") ||
      config.url.includes("create-admin") ||
      config.url.includes("refresh")
    ) {
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
        "ngrok-skip-browser-warning": "OJAN THE SIGMA",
      };
    }

    return config;
  },
  (error) => {
    console.error("axiosInstance.interceptors.request Error:", error.message);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 &&
        error?.response?.data?.errors[0] !== "Bad Credentials") ||
      (error?.response?.status === 403 && !originalRequest._retry)
    ) {
      const rememberedAccount = localStorage.getItem("rememberedAccount");
      if (rememberedAccount) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const { data } = await axiosInstance.post("/auth/refresh", {
            refreshToken: refreshToken,
          });
          localStorage.setItem("accessToken", data.accessToken);

          originalRequest._retry = true;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.error("Failed to refresh token: ", error.message);
        }
      }
      store.dispatch(logout());
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("rememberedAccount");
      toast.info("Your session has ended, please login again!");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
