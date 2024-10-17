import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    selectedItem: {},
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
    selectPost: (state, action) => {
      const id = action.payload;
      state.selectedItem = state.items.find((post) => post.id == id);
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
  setPosts,
  addPosts,
  editPosts,
  selectPost,
} = postsSlice.actions;

export default postsSlice.reducer;
