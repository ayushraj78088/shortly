import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import useUserStore from "../store/useUserStore";
import { Loader, LoaderCircle } from "lucide-react";

const RootLayout = () => {
  const checkAuth = useUserStore((state) => state.checkAuth);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  // checks whether the user is authenticated
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen gap-3">
        <Loader className="text-blue-500 size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default RootLayout;
