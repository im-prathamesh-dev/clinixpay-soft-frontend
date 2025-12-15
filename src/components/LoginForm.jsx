import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Dummy API response (backend आल्यानंतर replace कर)
    const response = {
      success: true,
      token: "abc123xyzTOKEN"
    };

    if (response.success) {
      // ✅ TOKEN STORE
      localStorage.setItem("token", response.token);
      alert("Login Successful ✅ Token Stored");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 col-md-6 mx-auto">
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label>Password *</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
