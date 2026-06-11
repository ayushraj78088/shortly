// components/ProtectedRoute.jsx

import { Navigate } from "react-router";
import useUserStore from "../store/useUserStore";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
