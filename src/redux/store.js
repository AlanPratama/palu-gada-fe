import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import themeReducer from "./theme/themeSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
	},
});
