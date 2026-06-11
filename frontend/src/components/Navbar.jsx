import { Link } from "react-router";
import { getCurrentUser } from "../api/user.api";

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-slate-50/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <div>
          <Link
            className="text-3xl font-black bg-linear-to-r from-slate-700 to-blue-500 bg-clip-text text-transparent"
            to={"/"}
          >
            Shortly
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow-md transition-colors cursor-pointer"
            to={"/auth"}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
