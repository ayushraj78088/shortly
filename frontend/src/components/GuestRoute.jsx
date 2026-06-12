import { Navigate } from "react-router";
import useUserStore from "../store/useUserStore";

const GuestRoute = ({ children }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <div>Loading...</div>;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return children;
};

export default GuestRoute;
