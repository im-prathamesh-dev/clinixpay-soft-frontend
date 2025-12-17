import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    storeName: "",
    location: "",
    contactNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    gstNo: "",
    storeLicNo: "",
    clinixPayLicKey: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("fullName.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        fullName: {
          ...prev.fullName,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password must match");
      return;
    }

    setLoading(true);

    try {
      // ❗ remove confirmPassword before sending
      const payload = { ...formData };
      delete payload.confirmPassword;
  
      console.log("Sending to backend:", payload);
  
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      alert(res.data.message);
      navigate("/login");
  
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-5xl">
        {/* Brand / Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-primary dark:text-primary-light tracking-tight">
            ClinixPay
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create your store account to start billing
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-card shadow-soft hover:shadow-soft-lg transition-all duration-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
            Store Registration
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Enter your store and license details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Column 1: Personal Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="fullName.firstName"
                    value={formData.fullName.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="fullName.middleName"
                    value={formData.fullName.middleName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="fullName.lastName"
                    value={formData.fullName.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Column 2: Contact & Store */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    placeholder="10 digit mobile"
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    GST Number *
                  </label>
                  <input
                    type="text"
                    name="gstNo"
                    value={formData.gstNo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 uppercase focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Column 3: Security & License */}
              <div className="space-y-4">



{/* Password Field */}
<div>
  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
    Password *
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 pr-10 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
    Min 6 characters
  </p>
</div>

{/* Confirm Password Field */}
<div>
  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
    Confirm Password *
  </label>
  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 pr-10 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary"
    >
      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    Store License No *
                  </label>
                  <input
                    type="text"
                    name="storeLicNo"
                    value={formData.storeLicNo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">
                    ClinixPay License Key *
                  </label>
                  <input
                    type="text"
                    name="clinixPayLicKey"
                    value={formData.clinixPayLicKey}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-2">
              <label className="inline-flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                />
                <span>
                  I agree to the{" "}
                  <span className="font-medium text-primary hover:text-primary-dark cursor-pointer">
                    Terms &amp; Conditions
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-primary hover:text-primary-dark cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  of ClinixPay.
                </span>
              </label>

              <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                >
                  {loading ? "Registering..." : "Register Store"}
                </button>
                <Link
                  to="/login"
                  className="text-sm font-medium text-primary hover:text-primary-dark hover:underline text-left md:text-right"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </form>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
            © {new Date().getFullYear()} ClinixPay. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;