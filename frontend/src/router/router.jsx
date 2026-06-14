import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import AnalyticsPage from "../pages/AnalyticsPage";

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
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "analytics",
            element: (
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
