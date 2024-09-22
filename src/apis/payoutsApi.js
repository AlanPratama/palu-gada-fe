import { toast } from "react-toastify";
import {
  setError,
  setIsLoading,
  setPayouts,
} from "../redux/payouts/payoutsSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class PayoutsApi {
  static async getAllPayouts(page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/payouts", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setPayouts({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PayoutsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getAllPayoutsByUser(userId, page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(
        `/admin/payouts/user/${userId}`,
        {
          params: {
            page,
            size,
            name: query,
          },
        }
      );

      store.dispatch(
        setPayouts({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PayoutsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async updatePayoutStatus(payoutId, status) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.put(
        "/admin/payouts/" + payoutId,
        null,
        { params: { status } }
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PayoutsApi update status: ", error);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default PayoutsApi;
