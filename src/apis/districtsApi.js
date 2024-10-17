import { toast } from "react-toastify";
import store from "../redux/store";
import {
  addDistricts,
  editDistricts,
  setDistricts,
  setError,
  setIsLoading,
} from "../redux/districts/districtsSlice";
import axiosInstance from "./axiosInstance";

class DistrictsApi {
  static async getAllDistricts(page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/districts", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setDistricts({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("DistrictsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async createDistricts(district) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.post("/admin/districts", {
        ...district,
        name: district.districtName,
      });

      store.dispatch(
        addDistricts({
          items: data.data.items,
        })
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("DistrictsApi create: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async editDistricts(district) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.put(
        "/admin/districts/" + district.id,
        {
          ...district,
          name: district.districtName,
        }
      );

      store.dispatch(
        editDistricts({
          items: data.data.items,
        })
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("DistrictsApi edit: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async deleteDistricts(id) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.delete("/admin/districts/" + id);
      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("DistrictsApi delete: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default DistrictsApi;
