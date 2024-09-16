import { toast } from "react-toastify";
import store from "../redux/store";
import { updatePayment, setPayments, setError, setIsLoading } from "../redux/payments/paymentsSlice";
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
      const errorMessage = error.response?.data?.errors ? error.response.data.errors[0] : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PaymentsApi get: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async updatePayment(payment) {
    try {
      store.dispatch(setIsLoading(true));
      const { data } = await axiosInstance.put("/admin/payments/" + payment.id, {
        ...payment,
      });

      store.dispatch(
        updatePayment({
          items: data.data.items,
        })
      );

      toast.success(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message ? error.response.data.message : error.message;

      store.dispatch(setError(errorMessage));
      console.error("PaymentsApi edit: ", errorMessage);
      toast.error(errorMessage);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

export default PaymentsApi;
