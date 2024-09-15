import { createSlice } from "@reduxjs/toolkit";

export const bidsSlice = createSlice({
  name: "bids",
  initialState: {
    items: [],
    item: null,
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setBids(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    setSelectedBid(state, action) {
      state.item = action.payload;
    },
    editBids(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setError,
  setIsLoading,
  setBids,
  setSelectedBid,
  addBids,
  editBids,
} = bidsSlice.actions;

export default bidsSlice.reducer;
