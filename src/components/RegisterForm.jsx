import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
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
      console.log("Final Data:", formData);
      // 🔗 API CALL HERE
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100   px-2 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <div className="card  border-3 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center fw-bold mb-4 text-primary">
                  ClinixPay Store Registration
                </h3>

                <form onSubmit={handleSubmit} className="row g-3">
                  {/* Column 1: Personal Info */}
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">First Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="fullName.firstName"
                        value={formData.fullName.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Middle Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="fullName.middleName"
                        value={formData.fullName.middleName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Last Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="fullName.lastName"
                        value={formData.fullName.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Email *</label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Column 2: Contact & Store */}
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Contact Number *</label>
                      <input
                        type="tel"
                        className="form-control form-control-sm"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        placeholder="10 digit mobile"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Location *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Store Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">GST Number *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm text-uppercase"
                        name="gstNo"
                        value={formData.gstNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Column 3: Security & License */}
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Password *</label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <small className="text-muted">Min 6 characters</small>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Confirm Password *</label>
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">Store License No *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="storeLicNo"
                        value={formData.storeLicNo}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-primary">ClinixPay License Key *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="clinixPayLicKey"
                        value={formData.clinixPayLicKey}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Terms and Submit - Full Width */}
                  <div className="col-12">
                    <div className="row align-items-center mt-2">
                      <div className="col-md-8">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="termsCheck"
                            required
                          />
                          <label className="form-check-label small" htmlFor="termsCheck">
                            I agree to the Terms & Conditions and Privacy Policy of ClinixPay
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 mt-2 mt-md-0">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 py-2 fw-semibold"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Registering...
                            </>
                          ) : (
                            "Register Store"
                          )}
                        </button>
                        <Link
                          to="/login"
                          className="btn btn-link text-decoration-none"
                        >
                          Already have an account? Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>

                <p className="text-center text-muted mt-4 mb-0 small">
                  © {new Date().getFullYear()} ClinixPay. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;