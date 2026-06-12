import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      { index: true, element: <HomePage /> },

      {
        path: "auth",
        element: (
          <GuestRoute>
            <AuthPage />
          </GuestRoute>
        ),
      },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
