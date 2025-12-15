import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="container">
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Fallback */}
        <Route path="*" element={<h3 className="text-center mt-5">Page Not Found</h3>} />
      </Routes>
    </div>
  );
}

export default App;
