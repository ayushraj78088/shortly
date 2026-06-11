import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import useUserStore from "../store/useUserStore";

const RootLayout = () => {
  const checkAuth = useUserStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default RootLayout;
