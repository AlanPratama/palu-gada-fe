import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import themeReducer from "./theme/themeSlice";
import categoriesReducer from "./categories/categoriesSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    theme: themeReducer,
  },
});
