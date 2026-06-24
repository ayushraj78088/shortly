import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import useUserStore from "../store/useUserStore";
import PageLoader from "../components/PageLoader";

const RootLayout = () => {
  const checkAuth = useUserStore((state) => state.checkAuth);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  // checks whether the user is authenticated
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default RootLayout;
