import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import store from "./redux/store";
import { setUserFromToken } from "./service/tokenService";

import { Spinner } from "@nextui-org/react";
import ProtectedRoute from "./components/ProtectedRoutes";
import CategoriesPage from "./pages/auth/categories/CategoriesPage";
import { DashboardPage } from "./pages/auth/DashboardPage";
import { ErrorPage } from "./pages/error/ErrorPage";
import { PageLayout } from "./layouts/PageLayout";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

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
			element: <ProtectedRoute condition={isAuthenticated} target={"/auth/login"} />,
		},
		{
			path: "/auth",
			element: (
				<ProtectedRoute condition={!isAuthenticated} target={"/"}>
					<Outlet />
				</ProtectedRoute>
			),
			children: [
				{
					path: "login",
					element: <LoginPage />,
				},
				{
					path: "register",
					element: <RegisterPage />,
				},
			],
		},
		{
			path: "/admin",
			element: (
				<ProtectedRoute condition={isAuthenticated && user.role === "admin"} target={"/auth/login"}>
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
					element: <CategoriesPage />,
				},
				{
					path: "categories",
					element: <CategoriesPage />,
				},
			],
		},
		{
			path: "/categoriesdev",
			element: <CategoriesPage />,
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
		<main className={`${darkMode ? "dark text-foreground bg-background" : ""} transition-colors duration-400`}>
			<RouterProvider router={router} />
		</main>
	);
}

export default App;
