import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: {
      firstName: "",
      middleName: "",
      lastName: ""
    },
    storeName: "",
    location: "",
    contactNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    gstNo: "",
    storeLicNo: "",
    clinixPayLicKey: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("fullName.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        fullName: {
          ...formData.fullName,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password must be same");
      return;
    }

    console.log("Final Data:", formData);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Store Registration</h3>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>First Name *</label>
              <input
                type="text"
                className="form-control"
                name="fullName.firstName"
                required
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Middle Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName.middleName"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Last Name *</label>
              <input
                type="text"
                className="form-control"
                name="fullName.lastName"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Store Info */}
          <div className="mb-3">
            <label>Store Name *</label>
            <input
              type="text"
              className="form-control"
              name="storeName"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Location *</label>
            <input
              type="text"
              className="form-control"
              name="location"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Contact Number *</label>
            <input
              type="text"
              className="form-control"
              name="contactNo"
              required
              onChange={handleChange}
            />
          </div>

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

          <div className="mb-3">
            <label>Password *</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password *</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              required
              onChange={handleChange}
            />
          </div>

          {/* Licenses */}
          <div className="mb-3">
            <label>GST Number *</label>
            <input
              type="text"
              className="form-control"
              name="gstNo"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Store License Number *</label>
            <input
              type="text"
              className="form-control"
              name="storeLicNo"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label>ClinixPay License Key *</label>
            <input
              type="text"
              className="form-control"
              name="clinixPayLicKey"
              required
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
