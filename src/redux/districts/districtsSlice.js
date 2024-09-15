import { createSlice } from "@reduxjs/toolkit";

export const districtsSlice = createSlice({
  name: "districts",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setDistricts(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    addDistricts(state, action) {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    editDistricts(state, action) {
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
  setDistricts,
  addDistricts,
  editDistricts,
} = districtsSlice.actions;

export default districtsSlice.reducer;
