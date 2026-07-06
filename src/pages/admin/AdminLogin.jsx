import React, { useState } from "react";
import { useParams, Navigate, NavLink } from "react-router-dom";

const AdminLogin = () => {
  const { admin } = useParams();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  if (admin !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === "admin" && password === "1234") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid ID or Password");
      setAuthenticated(false);
    }
  };

  if (!authenticated) {
    return (
      <div
        className="d-flex justify-content-center align-items-center bg-dark"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="card shadow-lg border-0 p-4 bg-light"
          style={{ width: "22rem", borderRadius: "12px" }}
        >
          <h2 className="text-center mb-4 fw-bold text-success">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>

            {error && (
              <p className="text-danger text-center small fw-bold">{error}</p>
            )}

            <button
              type="submit"
              className="btn btn-success w-100 mt-2 fw-bold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-dark text-white text-center"
      style={{ minHeight: "100vh", width: "100%", padding: "40px", gap: "20px" }}
    >
      <div className="mb-4">
        <h1 className="fw-bold">Welcome, Admin</h1>
        <p className="fs-5 text-secondary">
          Manage users, products, sales, and reports from here.
        </p>
      </div>

      <NavLink
        className="btn btn-lg px-4 py-2 fw-bold text-white"
        style={{
          background: "linear-gradient(90deg, #28a745, #19871b)",
          border: "none",
          borderRadius: "8px",
        }}
        to="/user-module/dashboard"
      >
        Go to Admin Panel
      </NavLink>
    </div>
  );
};

export default AdminLogin;
