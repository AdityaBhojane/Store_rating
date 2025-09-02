import { useState } from "react";
import { Lock } from "lucide-react";
import axios from "axios";


export const SignUp = ({ onSignInClick }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/signup", {
        name: fullName,
        email,
        address,
        password,
      });

      setSuccess("Account created successfully! 🎉");
      setFullName("");
      setEmail("");
      setAddress("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(()=> onSignInClick(),1000)
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
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
        <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Get started with your new account.
        </p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="block w-full px-3 py-3 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full px-3 py-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="block w-full px-3 py-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full px-3 py-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="block w-full px-3 py-3 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <button
          onClick={onSignInClick}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};
