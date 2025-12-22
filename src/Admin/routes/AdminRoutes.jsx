import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Licenses from "../pages/Licenses";
// import Customers from "../pages/Customers";
import Notifications from "../pages/Notifications";
import Support from "../pages/Support";

const AdminRoutes = () => (
  <AdminLayout>
    <Routes>
      {/* DEFAULT ADMIN ROUTE */}
      <Route index element={<Dashboard />} />

      <Route path="dashboard" element={<Dashboard />} />
      <Route path="licenses" element={<Licenses />} />
      {/* <Route path="customers" element={<Customers />} /> */}
      <Route path="notifications" element={<Notifications />} />
      <Route path="support" element={<Support />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  </AdminLayout>
);

export default AdminRoutes;
