import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import useUserStore from "../store/useUserStore";
import { Loader, LoaderCircle } from "lucide-react";
import Footer from "../components/Footer";

const RootLayout = () => {
  const checkAuth = useUserStore((state) => state.checkAuth);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  // checks whether the user is authenticated
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-mist-300">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
export default RootLayout;
