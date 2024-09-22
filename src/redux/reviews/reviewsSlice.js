import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setReviews: (state, action) => {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    createReview: (state, action) => {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    updateReview: (state, action) => {
      const review = action.payload;
      state.items = state.items.map((reviewItem) =>
        reviewItem.id === review.id ? review : reviewItem
      );
    },
    selectReview: (state, action) => {
      const id = action.payload;
      state.selectedItem = state.items.find((review) => review.id == id);
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
  setReviews,
  setIsLoading,
  setError,
  createReview,
  updateReview,
  selectReview,
} = reviewsSlice.actions;

const { reducer: reviewsReducer } = reviewsSlice;

export default reviewsReducer;
