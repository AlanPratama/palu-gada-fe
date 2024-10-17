import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes";
import { PageLayout } from "./layouts/PageLayout";
import BidsDetailPage from "./pages/auth/bids/BidsDetailPage";
import BidsPage from "./pages/auth/bids/BidsPage";
import CategoriesPage from "./pages/auth/categories/CategoriesPage";
import { DashboardPage } from "./pages/auth/DashboardPage";
import DistrictsPage from "./pages/auth/districts/DistrictsPage";
import PaymentsPage from "./pages/auth/payments/PaymentsPage";
import PostsPage from "./pages/auth/posts/PostsPage";
import { UsersPage } from "./pages/auth/users/UsersPage";
import { Page404 } from "./pages/error/404Page";
import ErrorPage from "./pages/error/ErrorPage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { login, logout } from "./redux/auth/authSlice";
import ReportedPostsPage from "./pages/auth/reportedPost/ReportedPosts";
import { MessagePage } from "./pages/message/MessagePage";
import { SettingPage } from "./pages/setting/SettingPage";
import { ResetPage } from "./pages/reset/ResetPage";
import ReportedPostsDetails from "./pages/auth/reportedPost/ReportedPostsDetails";
import PayoutsPage from "./pages/auth/payouts/PayoutsPage";
import ReviewsPage from "./pages/auth/reviews/ReviewsPage";
import ReportedUsersPage from "./pages/auth/reportedUsers/ReportedUsersPage";
import ReportedUserDetails from "./pages/auth/reportedUsers/ReportedUserDetails";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated) {
      dispatch(login(user));
    } else {
      dispatch(logout());
    }

    setLoading(false);

    darkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <ProtectedRoute condition={isAuthenticated} target={"/login"}>
          <PageLayout>
            <Outlet />
          </PageLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <DashboardPage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },
        {
          path: "categories",
          element: <CategoriesPage />,
        },
        {
          path: "cities",
          element: <DistrictsPage />,
        },
        {
          path: "posts",
          element: <PostsPage />,
        },
        {
          path: "bids",
          element: <BidsPage />,
        },
        {
          path: "bids/:id",
          element: <BidsDetailPage />,
        },
        {
          path: "payments",
          element: <PaymentsPage />,
        },
        {
          path: "payouts",
          element: <PayoutsPage />,
        },
        {
          path: "settings",
          element: <SettingPage />,
        },
        {
          path: "report-post",
          element: <ReportedPostsPage />,
        },
        {
          path: "report-post/:id",
          element: <ReportedPostsDetails />,
        },
        {
          path: "report-user",
          element: <ReportedUsersPage />,
        },
        {
          path: "report-user/:id",
          element: <ReportedUserDetails />,
        },
        {
          path: "reviews",
          element: <ReviewsPage />,
        },
        {
          path: "messages",
          element: <MessagePage />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute condition={!isAuthenticated} target={"/"}>
          <LoginPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedRoute condition={!isAuthenticated} target={"/"}>
          <RegisterPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <ProtectedRoute condition={!isAuthenticated} target={"/"}>
          <ResetPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main
      className={`${
        darkMode ? "dark text-foreground bg-background" : ""
      } transition-colors duration-400`}
    >
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
