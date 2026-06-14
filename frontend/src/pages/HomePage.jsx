import UrlForm from "../components/UrlForm";
import useUserStore from "../store/useUserStore";
import { Navigate } from "react-router";

const HomePage = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col justify-center items-center text-black">
      <UrlForm />
    </div>
  );
};
export default HomePage;
