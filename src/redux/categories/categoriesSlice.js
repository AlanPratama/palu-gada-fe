import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCategories(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    addCategories(state, action) {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    editCategories(state, action) {
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
  setCategories,
  addCategories,
  editCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
