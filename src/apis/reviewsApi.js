import { toast } from "react-toastify";
import store from "../redux/store";
import {
  setReviews,
  setError,
  setIsLoading,
} from "../redux/reviews/reviewsSlice";
import axiosInstance from "./axiosInstance";

class ReviewsApi {
  static async getAllReviews(page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/reviews", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setReviews({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReviewsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getAllReviewsByUser(userId, page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(
        `/admin/reviews/user/${userId}`,
        {
          params: {
            page,
            size,
            name: query,
          },
        }
      );

      store.dispatch(
        setReviews({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReviewsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getAllReviewsByPost(postId, page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(
        `/admin/reviews/post/${postId}`,
        {
          params: {
            page,
            size,
            name: query,
          },
        }
      );

      store.dispatch(
        setReviews({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReviewsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async deleteReviews(id) {
    console.log(id);

    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.delete("/admin/reviews/" + id);
      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("ReviewsApi delete: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default ReviewsApi;
