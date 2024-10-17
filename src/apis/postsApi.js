import { toast } from "react-toastify";
import store from "../redux/store";
import {
  editPosts,
  setPosts,
  setError,
  setIsLoading,
} from "../redux/posts/postsSlice";
import axiosInstance from "./axiosInstance";

class PostsApi {
  static async getAllPosts(page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/posts", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setPosts({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PostsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async editPostStatus(id, status) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.put(`/admin/posts/${id}`, null, {
        params: { status },
      });

      store.dispatch(
        editPosts({
          items: data.data.items,
        })
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PostsApi edit: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async deletePosts(id) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.delete("/admin/posts/" + id);
      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PostsApi delete: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default PostsApi;
