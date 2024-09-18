import { toast } from "react-toastify";
import { login, logout, setError, setIsLoading } from "../redux/auth/authSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class AuthApi {
  static async login(usernameOrEmail, password) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.post("/auth/login", {
        usernameOrEmail,
        password,
      });

      if (!data.authorities.includes("ROLE_ADMIN"))
        throw new Error("Bad Credentials");

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      this.getUserData();
      toast.success("Login berhasil!");
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("AuthApi login: ", error);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getUserData() {
    try {
      const userData = await axiosInstance.get("/admin/users/me");

      if (!userData.data.data) {
        store.dispatch(logout());
        throw new Error("Gagal mengambil data pengguna");
      }

      store.dispatch(login(userData.data.data));

      return userData.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("AuthApi getUserData: ", error);
      toast.error(errorMessage);

      store.dispatch(logout());
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async registerAdmin(userData) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { email, username, password, secretKey } = userData;

      await axiosInstance.post(
        "/auth/create-admin",
        {
          email: email,
          username: username,
          password: password,
        },
        {
          headers: {
            "X-Admin-Secret-Key": secretKey,
          },
        }
      );

      toast.info("Login to your account");
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.message
        : error.message;
      store.dispatch(setError(errorMessage));
      console.error(error);
      toast.error(errorMessage);
      throw new Error("AuthApi register: ", errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default AuthApi;
