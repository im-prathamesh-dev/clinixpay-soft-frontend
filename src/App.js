import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

/* ================= USER APP ================= */
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Finance from "./pages/Finance";
import Profile from "./pages/Profile";

/* ================= ADMIN APP ================= */
import AdminLayout from "./Admin/layout/AdminLayout";
import AdminLogin from "./Admin/pages/AdminLogin";
import AdminDashboard from "./Admin/pages/Dashboard";
import Licenses from "./Admin/pages/Licenses";
import AdminCustomers from "./Admin/pages/Customers";
import Notifications from "./Admin/pages/Notifications";
import Support from "./Admin/pages/Support";

/* ================= PROTECTED ROUTES ================= */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AdminProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Layout>
                <Billing />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout>
                <Inventory />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Layout>
                <Customers />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              <Layout>
                <Finance />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          {/* DEFAULT ADMIN DASHBOARD */}
          <Route index element={<AdminDashboard />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="licenses" element={<Licenses />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
