import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, QrCode, Activity } from 'lucide-react';
import apiclient from '../Api/api';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiclient.post("/user/login", {
        email,
        password
      });

      const token = res.data.access_token;

      // store token
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // redirect
      navigate("/dashboard");

    } catch (err) {
      setError(
        err?.response?.data?.detail || "Login failed. Try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-900 p-4 rounded-full mb-4">
            <Activity className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Smart Healthcare System</h1>
          <p className="text-gray-500 text-sm">Secure Access Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              <Eye size={20} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Role
            </label>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500"
            >
              <option value="">Choose your role</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition shadow-md"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p className="mt-8 text-center text-xs text-gray-400">
          Secure healthcare access • End-to-end encrypted
        </p>
      </div>
    </div>
  );
};

export default Login;