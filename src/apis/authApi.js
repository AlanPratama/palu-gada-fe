import { login, setError, setIsLoading } from "../redux/auth/authSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { decodeToken } from "../service/tokenService";
import { toast } from "react-toastify";

class AuthApi {
  static async login(usernameOrEmail, password) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.post("/auth/login", {
        usernameOrEmail,
        password,
      });

      data.roles = ["Test", "ROLE_ADMIN"];

      if (!data.roles.includes("ROLE_ADMIN"))
        throw new Error("Hanya admin yang diizinkan");

      localStorage.setItem("token", data.accessToken);

      store.dispatch(login(decodeToken(data.accessToken)));

      toast.success("Berhasil login!");
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("AuthApi login: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default AuthApi;
