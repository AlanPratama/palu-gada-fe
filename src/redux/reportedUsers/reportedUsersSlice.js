import { createSlice } from "@reduxjs/toolkit";

export const reportedUsersSlice = createSlice({
  name: "reportedUsers",
  initialState: {
    items: [],
    item: null,
    total: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setReportedUsers(state, action) {
      const { items, total } = action.payload;
      state.items = items;
      state.total = total;
    },
    addReportedUsers(state, action) {
      state.items = [...state.items, action.payload];
      state.total += 1;
    },
    setSelectedReportedUser(state, action) {
      state.item = action.payload;
    },
    editReportedUsers(state, action) {
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
  setReportedUsers,
  setSelectedReportedUser,
  addReportedUsers,
  editReportedUsers,
} = reportedUsersSlice.actions;

export default reportedUsersSlice.reducer;
