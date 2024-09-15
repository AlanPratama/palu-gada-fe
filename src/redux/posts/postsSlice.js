import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPosts(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    editPosts(state, action) {
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

export const { setError, setIsLoading, setPosts, addPosts, editPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
