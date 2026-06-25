import useUserStore from "../store/useUserStore";
import UrlForm from "../components/UrlForm";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const DashboardPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="bg-slate-300 flex flex-col pt-24 items-center text-black pb-10">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Create, manage, and track your shortened URLs.
        </p>
      </div>

      <UrlForm />

      <div className="mt-6 flex items-center justify-between rounded-xl bg-blue-50 px-5 py-4 w-full max-w-lg">
        <div>
          <h3 className="font-semibold text-gray-800">
            Need to track your URLs?
          </h3>

          <p className="text-sm text-gray-600">
            View clicks and manage all shortened links.
          </p>
        </div>

        <Link
          to="/dashboard/analytics"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Analytics
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
export default DashboardPage;
