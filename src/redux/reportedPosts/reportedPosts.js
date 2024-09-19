import { createSlice } from "@reduxjs/toolkit";

export const reportedPostsSlice = createSlice({
  name: "reportedPosts",
  initialState: {
    items: [],
    item: null,
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setReportedPosts(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    addReportedPosts(state, action) {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    setSelectedReportedPost(state, action) {
      state.item = action.payload;
    },
    editReportedPosts(state, action) {
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
  setReportedPosts,
  setSelectedReportedPost,
  addReportedPosts,
  editReportedPosts,
} = reportedPostsSlice.actions;

export default reportedPostsSlice.reducer;
