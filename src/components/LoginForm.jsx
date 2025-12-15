import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      const { data } = await axios.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (data.success) {
        // ✅ Store auth data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // 🚀 Redirect
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center  px-2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="card  border-3 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center fw-bold mb-4 text-primary">
                  ClinixPay Login
                </h3>

                {/* ❌ Error Message */}
                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Don’t have an account?{" "}
                    <Link
                      to="/register"
                      className="text-decoration-none"
                    >
                      Register
                    </Link>
                  </small>
                </div>
              </div>
            </div>

            <p className="text-center text-muted mt-3 small">
              © {new Date().getFullYear()} ClinixPay. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
