import { Link, useNavigate } from "react-router";
import useUserStore from "../store/useUserStore";
import { logoutUser } from "../api/user.api";

function Navbar() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-slate-50/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <div>
          <Link
            className="text-3xl font-black bg-linear-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent"
            to={"/"}
          >
            Shortly
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow-md transition-colors cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow-md transition-colors cursor-pointer"
              to={"/auth"}
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
