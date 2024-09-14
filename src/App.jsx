import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

import store from "./redux/store";
import { setUserFromToken } from "./service/tokenService";
import ProtectedRoute from "./components/ProtectedRoutes";
import { DashboardPage } from "./pages/auth/DashboardPage";
import { ErrorPage } from "./pages/error/ErrorPage";
import { PageLayout } from "./layouts/PageLayout";
import { LoginPage } from "./pages/login/LoginPage";
import { UsersPage } from "./pages/auth/users/UsersPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import CategoriesPage from "./pages/auth/categories/CategoriesPage";
import DistrictsPage from "./pages/auth/districts/DistrictsPage";

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
      element: (
        <ProtectedRoute
          condition={isAuthenticated && user.roles[0] === "ROLE_ADMIN"}
          target={"/login"}
        >
          <PageLayout>
            <Outlet />
          </PageLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
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
          path: "city",
          element: <DistrictsPage />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute
          condition={!isAuthenticated || user?.roles[0] !== "ROLE_ADMIN"}
          target={"/"}
        >
          <LoginPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedRoute
          condition={!isAuthenticated || user?.roles[0] !== "ROLE_ADMIN"}
          target={"/"}
        >
          <RegisterPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
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
