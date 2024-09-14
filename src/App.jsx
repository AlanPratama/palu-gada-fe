import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

import store from "./redux/store";
import { setUserFromToken } from "./service/tokenService";
import ProtectedRoute from "./components/ProtectedRoutes";
import CategoriesPage from "./pages/auth/categories/CategoriesPage";
import { DashboardPage } from "./pages/auth/DashboardPage";
import { ErrorPage } from "./pages/error/ErrorPage";
import { PageLayout } from "./layouts/PageLayout";
import { LoginPage } from "./pages/login/LoginPage";
// import { UsersPage } from "./pages/auth/users/UsersPage";
import { RegisterPage } from "./pages/register/RegisterPage";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserFromToken(store);
    setLoading(false);
  }, []);

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
          element: <div>ini user page</div>,
        },
        {
          path: "categories",
          element: <CategoriesPage />,
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
