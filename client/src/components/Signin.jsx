import { useState } from "react";
import { Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = ({ onSignUpClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email,
          password,
        }
      );

      const data = response.data;

      console.log("✅ Signed in:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data?.role === "ADMIN") {
        navigate("/admin");
      } else if (data?.role === "STORE_OWNER") {
        navigate("/store-owner");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("❌ Sign in error:", err);
      setError(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Lock />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to continue to your account.
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <input
            id="email-signin"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            id="password-signin"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <button
          onClick={onSignUpClick}
          className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};
