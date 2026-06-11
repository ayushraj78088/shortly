import { Navigate } from "react-router";
import useUserStore from "../store/useUserStore";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
