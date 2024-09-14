import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import themeReducer from "./theme/themeSlice";
import usersReducer from "./users/usersSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    users: usersReducer,
  },
});
