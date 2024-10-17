import { toast } from "react-toastify";
import {
  setError,
  setIsLoading,
  setReportedUsers,
  setSelectedReportedUser,
} from "../redux/reportedUsers/reportedUsersSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class ReportedUsersApi {
  static async getAllReportedUsers(page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/user-reports", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setReportedUsers({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReportedUsersApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getById(id) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(`/admin/user-reports/${id}`);

      store.dispatch(setSelectedReportedUser(data.data));
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReportedUsersApi getById: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getAllReportedUsersByUser(userId, page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(
        `/admin/post-reports/user/${userId}`,
        {
          params: {
            page,
            size,
            name: query,
          },
        }
      );

      store.dispatch(
        setReportedUsers({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReportedUsersApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default ReportedUsersApi;
