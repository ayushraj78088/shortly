import { useState } from "react";
import { loginUser } from "../api/user.api";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("ayush@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-800">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-sky-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-800"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-sky-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="size-5 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => state(false)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Register
        </button>
      </p>
    </div>
  );
};
export default LoginForm;
