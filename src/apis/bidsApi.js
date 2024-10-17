import { toast } from "react-toastify";
import store from "../redux/store";
import {
  editBids,
  setBids,
  setError,
  setIsLoading,
  setSelectedBid,
} from "../redux/bids/bidsSlice";
import axiosInstance from "./axiosInstance";

class BidsApi {
  static async getAllBids(page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/bids", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setBids({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("BidsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getById(id) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(`/admin/bids/${id}`);

      store.dispatch(setSelectedBid(data.data));
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("BidsApi getById: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async editBidStatus(id, status) {
    try {
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.patch(
        `/admin/bids/${id}/status`,
        null,
        { params: { status } }
      );

      store.dispatch(
        editBids({
          items: data.data.items,
        })
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("BidsApi edit: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async deleteBids(id) {
    try {
      store.dispatch(setIsLoading(true));
      await axiosInstance.delete("/admin/bids/" + id);
      toast.success("Berhasil menghapus bid!");
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("BidsApi delete: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default BidsApi;
