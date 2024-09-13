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

      if (!data.roles.includes("ROLE_ADMIN")) throw new Error("Hanya admin yang diizinkan");

      localStorage.setItem("token", data.accessToken);

      store.dispatch(login(decodeToken(data.accessToken)));

      toast.success("Berhasil login!", { position: "top-center" });
    } catch (error) {
      const errorMessage = error.response?.data?.errors ? error.response.data.errors[0] : error.message;

      store.dispatch(setError(errorMessage));
      console.error("AuthApi login: ", errorMessage);
      toast.error(errorMessage, { position: "top-center" });
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
      store.dispatch(setError(error.message));
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      throw new Error("AuthApi register: ", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default AuthApi;
