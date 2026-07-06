import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LiveBackground from "../components/ui/LiveBackground";
import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        dob: formData.dob,
      });

      alert(res.data.message || "Signup successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error("❌ Signup error:", err);
      alert(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fb-auth-wrap py-5">
      <LiveBackground />
      <div className="card fb-auth-card shadow-lg p-4 position-relative" style={{ maxWidth: "26rem", zIndex: 1 }}>
        <h2 className="text-center mb-2 text-success fw-bold">Create Account</h2>
        <p className="text-muted text-center mb-4">Sign up to get started</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-semibold">Address</label>
            <textarea
              id="address"
              className="form-control"
              placeholder="Enter your address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label fw-semibold">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 fb-btn" disabled={loading}>
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0 small">
          Already have an account?{" "}
          <Link to="/login" className="text-success fw-semibold text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
