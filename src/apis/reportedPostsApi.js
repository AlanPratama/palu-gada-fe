import { toast } from "react-toastify";
import {
  setError,
  setIsLoading,
  setReportedPosts,
  setSelectedReportedPost,
} from "../redux/reportedPosts/reportedPosts";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class ReportedPostsApi {
  static async getAllReportedPosts(page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/post-reports", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setReportedPosts({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReportedPostsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getById(id) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(`/admin/post-reports/${id}`);

      store.dispatch(setSelectedReportedPost(data.data));
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReportedPostsApi getById: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getAllReportedPostsByUser(userId, page, size, query) {
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
        setReportedPosts({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReportedPostsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default ReportedPostsApi;
