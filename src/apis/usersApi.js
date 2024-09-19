import { toast } from "react-toastify";
import store from "../redux/store";
import {
  setError,
  setIsLoading,
  setUsers,
  updateUser,
} from "../redux/users/usersSlice";
import axiosInstance from "./axiosInstance";

class UsersApi {
  static async getAll(page = 0, size = 10, query) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.get("/admin/users", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setUsers({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      toast.error(errorMessage);
      throw new Error("UsersApi getAll: ", errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async createAdmin(userData) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { email, username, password } = userData;

      await axiosInstance.post("/admin/users", {
        email: email,
        username: username,
        password: password,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.message
        : error.message;
      store.dispatch(setError(errorMessage));
      console.log(error);
      toast.error(errorMessage);
      throw new Error("AuthApi register: ", errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async updateAdminProfile(userData) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.put(`/admin/users`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      store.dispatch(updateUser(data.data));
      toast.success("Berhasil mengubah profil!");
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;
      store.dispatch(setError(errorMessage));
      console.log(error);
      toast.error(errorMessage);
      throw new Error("AuthApi register: ", errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default UsersApi;
