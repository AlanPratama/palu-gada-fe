import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    createUser: (state, action) => {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    updateUser: (state, action) => {
      const user = action.payload;
      state.items = state.items.map((userItem) => (userItem.id === user.id ? user : userItem));
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, setIsLoading, setError, createUser, updateUser } = usersSlice.actions;

const { reducer: usersReducer } = usersSlice;

export default usersReducer;
