import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("Seeds");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/supplier-signup", { name, contact, email, address, category, password });

      setSubmitted(true);
      setTimeout(() => navigate("/supplier-module/login"), 2000);
    } catch (err) {
      console.error("❌ Signup error:", err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || "Error connecting to server";
      alert(errMsg);
    }
  };

  if (submitted) {
    return (
      <div className="fb-auth-wrap">
        <div className="card fb-auth-card shadow p-4 text-center">
          <h4 className="text-success fw-bold mb-3">✅ Signup Successful</h4>
          <p className="text-muted">
            Your account has been created. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fb-auth-wrap">
      <div className="card fb-auth-card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center text-success fw-bold mb-3">🌱 Supplier Signup</h3>
        <form onSubmit={handleSignup}>

          <div className="mb-3">
            <label className="form-label fw-semibold">Supplier Name</label>
            <input type="text" className="form-control"
              value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contact Number</label>
            <input type="tel" className="form-control" maxLength="10"
              value={contact} onChange={(e) => setContact(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <input type="text" className="form-control"
              value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select className="form-select"
              value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Seeds">Seeds</option>
              <option value="Pesticides">Pesticides</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-success w-100 fb-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
