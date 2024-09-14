import { toast } from "react-toastify";
import store from "../redux/store";
import {
  addCategories,
  editCategories,
  setCategories,
  setError,
  setIsLoading,
} from "../redux/categories/categoriesSlice";
import axiosInstance from "./axiosInstance";

class CategoriesApi {
  static async getCategories() {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/categories");

      store.dispatch(
        setCategories({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("CategoriesApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async createCategories(category) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.post("/admin/categories", {
        ...category,
      });

      store.dispatch(
        addCategories({
          items: data.data.items,
        })
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("CategoriesApi create: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async editCategories(category) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.put(
        "/admin/categories/" + category.id,
        {
          ...category,
        }
      );

      store.dispatch(
        editCategories({
          items: data.data.items,
        })
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("CategoriesApi edit: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async deleteCategories(id) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.delete("/admin/categories/" + id);
      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("CategoriesApi delete: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default CategoriesApi;
