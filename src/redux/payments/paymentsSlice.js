import { createSlice } from "@reduxjs/toolkit";

export const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPayments: (state, action) => {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    createPayment: (state, action) => {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    updatePayment: (state, action) => {
      const payment = action.payload;
      state.items = state.items.map((paymentItem) => (paymentItem.id === payment.id ? payment : paymentItem));
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPayments, setIsLoading, setError, createPayment, updatePayment } = paymentsSlice.actions;

const { reducer: paymentsReducer } = paymentsSlice;

export default paymentsReducer;
