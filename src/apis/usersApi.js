import { toast } from "react-toastify";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import { setError, setIsLoading, setUsers } from "../redux/users/usersSlice";

class UsersApi {
  static async getAll(page = 0, limit = 10, query) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.get("/admin/users", {
        params: {
          page,
          limit,
          query,
        },
      });

      store.dispatch(
        setUsers({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message ? error.response.data.message : error.message;

      store.dispatch(setError(errorMessage));
      toast.error(errorMessage);
      throw new Error("UsersApi getAll: ", errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default UsersApi;
