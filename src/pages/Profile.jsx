import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  /* Toast State */
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const token = localStorage.getItem("token");

  /* =========================
     FETCH PROFILE
  ========================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/customer-details",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setData(res.data.customer);
        setFormData(res.data.customer);
      } catch (error) {
        showToast("Failed to load profile", "error");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  /* =========================
     TOAST HELPER
  ========================= */
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 3000);
  };

  /* =========================
     LICENSE EXPIRY
  ========================= */
  const calculateExpiry = (createdAt) => {
    const start = new Date(createdAt);
    const expiry = new Date(start);
    expiry.setFullYear(expiry.getFullYear() + 1); // 1 year license
    const daysLeft = Math.ceil(
      (expiry - new Date()) / (1000 * 60 * 60 * 24)
    );
    return { expiry, daysLeft };
  };

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (path, value) => {
    setFormData((prev) => {
      if (path.includes(".")) {
        const [parent, child] = path.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      return { ...prev, [path]: value };
    });
  };

  /* =========================
     SAVE PROFILE
  ========================= */
  const handleSave = async () => {
    try {
      await axios.patch(
        "http://localhost:5000/api/v1/customer-update",
        {
          fullName: formData.fullName,
          storeName: formData.storeName,
          location: formData.location,
          contactNo: formData.contactNo,
          gstNo: formData.gstNo,
          storeLicNo: formData.storeLicNo
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setData(formData);
      setEditMode(false);
      showToast("Profile updated successfully", "success");
    } catch (error) {
      showToast("Failed to update profile", "error");
    }
  };

  if (!data || !formData) return <p className="p-6">Loading...</p>;

  const { expiry, daysLeft } = calculateExpiry(data.createdAt);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Profile Management</h1>

      {/* License Info */}
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30">
        <p className="text-sm">License Expiry</p>
        <p className="font-medium">{expiry.toDateString()}</p>
        <p
          className={`text-sm ${
            daysLeft < 15 ? "text-red-600" : "text-green-600"
          }`}
        >
          {daysLeft} days remaining
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.fullName.firstName}
            onChange={(e) =>
              handleChange("fullName.firstName", e.target.value)
            }
            disabled={!editMode}
          />
          <Input
            label="Middle Name"
            value={formData.fullName.middleName}
            onChange={(e) =>
              handleChange("fullName.middleName", e.target.value)
            }
            disabled={!editMode}
          />
          <Input
            label="Last Name"
            value={formData.fullName.lastName}
            onChange={(e) =>
              handleChange("fullName.lastName", e.target.value)
            }
            disabled={!editMode}
          />
          <Input
            label="Store Name"
            value={formData.storeName}
            onChange={(e) => handleChange("storeName", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Contact No"
            value={formData.contactNo}
            onChange={(e) => handleChange("contactNo", e.target.value)}
            disabled={!editMode}
          />
          <Input label="Email" value={formData.email} disabled />
          <Input
            label="GST No"
            value={formData.gstNo}
            onChange={(e) => handleChange("gstNo", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Store License No"
            value={formData.storeLicNo}
            onChange={(e) => handleChange("storeLicNo", e.target.value)}
            disabled={!editMode}
          />
          <Input label="License Key" value={formData.clinixPayLicKey} disabled />
        </div>

        <div className="flex gap-3 mt-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setFormData(data);
                  setEditMode(false);
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
              ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================
   INPUT COMPONENT
========================= */
const Input = ({ label, value, onChange, disabled }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <input
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`w-full mt-1 p-2 border rounded ${
        disabled
          ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
          : "bg-white dark:bg-gray-700"
      }`}
    />
  </div>
);

export default Profile;
