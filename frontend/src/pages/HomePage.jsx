import UrlForm from "../components/UrlForm";
import useUserStore from "../store/useUserStore";
import { Link, Navigate } from "react-router";

const HomePage = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col pt-24 items-center text-black">
      <UrlForm />

      <div className="mt-6 text-center max-w-md pb-10">
        <h3 className="text-lg font-semibold text-slate-800">
          Want more than just shortening links?
        </h3>

        <p className="mt-2 text-slate-600">
          Sign in to create custom URLs, track clicks, view analytics, and
          manage all your shortened links in one place.
        </p>

        <Link
          to="/auth"
          className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};
export default HomePage;
