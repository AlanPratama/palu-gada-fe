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

      localStorage.setItem("token", data.accessToken);

      store.dispatch(login(decodeToken(data.accessToken)));

      toast.success("Berhasil login!", { position: "top-center" });
    } catch (error) {
      store.dispatch(setError(error.response.data.errors[0]));
      console.error("AuthApi login: ", error.response.data.errors);
      toast.error(error.response.data.errors[0], { position: "top-center" });
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default AuthApi;
