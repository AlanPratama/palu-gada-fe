import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes";
import { PageLayout } from "./layouts/PageLayout";
import BidsPage from "./pages/auth/bids/BidsPage";
import CategoriesPage from "./pages/auth/categories/CategoriesPage";
import { DashboardPage } from "./pages/auth/DashboardPage";
import DistrictsPage from "./pages/auth/districts/DistrictsPage";
import PostsPage from "./pages/auth/posts/PostsPage";
import { UsersPage } from "./pages/auth/users/UsersPage";
import { Page404 } from "./pages/error/404Page";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import store from "./redux/store";
import { setUserFromToken } from "./service/tokenService";
import ErrorPage from "./pages/error/ErrorPage";
import BidsDetailPage from "./pages/auth/bids/BidsDetailPage";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserFromToken(store);
    setLoading(false);
    darkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [darkMode]);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <ProtectedRoute
          condition={isAuthenticated && user.roles.includes("ROLE_ADMIN")}
          target={"/login"}
        >
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
          path: "bid/:id",
          element: <BidsDetailPage />,
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
