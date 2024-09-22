import { createSlice } from "@reduxjs/toolkit";

export const payoutsSlice = createSlice({
  name: "payouts",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPayouts: (state, action) => {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    createPayout: (state, action) => {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    updatePayout: (state, action) => {
      const payout = action.payload;
      state.items = state.items.map((payoutItem) =>
        payoutItem.id === payout.id ? payout : payoutItem
      );
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPayouts,
  setIsLoading,
  setError,
  createPayout,
  updatePayout,
} = payoutsSlice.actions;

const { reducer: payoutsReducer } = payoutsSlice;

export default payoutsReducer;
