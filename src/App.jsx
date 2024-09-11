import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CategoryPage } from "./pages/auth/CategoryPage";
import { DashboardPage } from "./pages/auth/DashboardPage";
import { ErrorPage } from "./pages/error/ErrorPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/auth/login" />, 
    },
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
    {
      path: "/auth/register",
      element: <RegisterPage />,
    },
    {
      path: "/admin/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/admin/kategori",
      element: <CategoryPage />,
    },
    {
      path: "*", 
      element: <ErrorPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App