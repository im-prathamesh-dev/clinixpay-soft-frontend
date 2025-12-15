import React, { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  const [page, setPage] = useState("login"); // login | register

  return (
    <div>
      <div className="text-center mt-3">
        <button
          className="btn btn-link"
          onClick={() => setPage("login")}
        >
          Login
        </button>

        <button
          className="btn btn-link"
          onClick={() => setPage("register")}
        >
          Register
        </button>
      </div>

      {page === "login" && <LoginForm />}
      {page === "register" && <RegisterForm />}
    </div>
  );
}

export default App;
