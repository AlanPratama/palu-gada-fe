import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    selectedItem: {},
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    createUser: (state, action) => {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    updateUser: (state, action) => {
      const user = action.payload;
      state.items = state.items.map((userItem) => (userItem.id === user.id ? user : userItem));
    },
    selectUser: (state, action) => {
      const id = action.payload;
      state.selectedItem = state.items.find((user) => user.id == id);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, setIsLoading, setError, createUser, updateUser, selectUser } = usersSlice.actions;

const { reducer: usersReducer } = usersSlice;

export default usersReducer;
