import { toast } from "react-toastify";
import {
  setError,
  setIsLoading,
  setPayments,
} from "../redux/payments/paymentsSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class PaymentsApi {
  static async getAllPayments(page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get("/admin/payments", {
        params: {
          page,
          size,
          name: query,
        },
      });

      store.dispatch(
        setPayments({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PaymentsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async getAllPaymentsByUser(userId, page, size, query) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(
        `/admin/payments/user/${userId}`,
        {
          params: {
            page,
            size,
            name: query,
          },
        }
      );

      store.dispatch(
        setPayments({
          items: data.data.items,
          total: data.data.totalItems,
        })
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors[0]
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PaymentsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async cancelPayment(payment) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.put(
        "/admin/payments/" + payment.id + "/transaction?status=CANCEL"
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PaymentsApi edit: ", error);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default PaymentsApi;
