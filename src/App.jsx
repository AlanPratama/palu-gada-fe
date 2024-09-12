import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { setUserFromToken } from "./service/tokenService";
import store from "./redux/store";

import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CategoryPage } from "./pages/auth/CategoryPage";
import { DashboardPage } from "./pages/auth/DashboardPage";
import { ErrorPage } from "./pages/error/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Spinner } from "@nextui-org/react";
import { PageLayout } from "./layouts/PageLayout";

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
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
					path: "categories",
					element: <CategoryPage />,
				},
			],
		},
		{
			path: "*",
			element: <ErrorPage />,
		},
	]);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Spinner size='lg' />
			</div>
		);
	}

	return <RouterProvider router={router} />;
}

export default App;
