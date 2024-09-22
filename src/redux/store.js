import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import themeReducer from "./theme/themeSlice";
import categoriesReducer from "./categories/categoriesSlice";
import usersReducer from "./users/usersSlice";
import districtsReducer from "./districts/districtsSlice";
import postsReducer from "./posts/postsSlice";
import bidsReducer from "./bids/bidsSlice";
import paymentsReducer from "./payments/paymentsSlice";
import reportedPostsReducer from "./reportedPosts/reportedPosts";
import payoutsReducer from "./payouts/payoutsSlice";
import reviewsReducer from "./reviews/reviewsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    districts: districtsReducer,
    posts: postsReducer,
    bids: bidsReducer,
    payments: paymentsReducer,
    reportedPosts: reportedPostsReducer,
    payouts: payoutsReducer,
    reviews: reviewsReducer,
    theme: themeReducer,
  },
});
