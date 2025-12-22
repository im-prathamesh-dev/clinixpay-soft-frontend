import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/admin/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    // ✅ ADMIN LOGIN SUCCESS
    if (data.token) {
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};


  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        {/* Brand / Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-primary dark:text-primary-light tracking-tight">
            ClinixPay
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Billing dashboard for modern medical stores
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-card shadow-soft hover:shadow-soft-lg transition-all duration-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
           Admin Login
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Sign in to access your Admin dashboard
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-2.5 pr-11 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer Links */}
          {/* <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary-dark hover:underline transition-colors"
            >
              Register
            </Link>
          </div> */}
        </div>

        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} ClinixPay. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
