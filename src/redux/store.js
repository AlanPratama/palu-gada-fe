import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import themeReducer from "./theme/themeSlice";
import categoriesReducer from "./categories/categoriesSlice";
import usersReducer from "./users/usersSlice";
import districtsReducer from "./districts/districtsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    districts: districtsReducer,
    theme: themeReducer,
  },
});
