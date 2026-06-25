import { Navigate } from "react-router";
import useUserStore from "../store/useUserStore";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px-80px)]">
        <Loader className="text-blue-500 size-10 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
