import UrlForm from "../components/UrlForm";
import useUserStore from "../store/useUserStore";
import { Link, Navigate } from "react-router";

const HomePage = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col pt-24 gap-6 items-center text-black">
      <div className="mt-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-slate-900">Welcome to Shortly</h1>

        <p className="text-slate-600 italic">Shorten, share, and manage your links effortlessly.</p>
      </div>

      <UrlForm />

      <div className="text-center max-w-md pb-10">
        <h3 className="text-lg font-semibold text-slate-800">
          Want more than just shortening links?
        </h3>

        <p className="mt-1 text-slate-600">
          Sign in to create custom URLs, track clicks, view analytics, and
          manage all your shortened links in one place.
        </p>

        <Link
          to="/auth"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
        >
          Get Your Account
        </Link>
      </div>
    </div>
  );
};
export default HomePage;
