import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LiveBackground from "../../components/ui/LiveBackground";
import api from "../../services/api";

const SupLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMsgType("");
    setLoading(true);

    try {
      const res = await api.post("/supplier-module/sup-login", { email, password });
      const data = res.data;

      localStorage.setItem(
        "supplier",
        JSON.stringify({
          sup_id: data.sup_id,
          supplier_name: data.supplier_name,
          email: data.email,
        })
      );
      setMsgType("success");
      setMessage(`✅ Welcome ${data.supplier_name}`);
      setTimeout(() => navigate("/supplier-module/sup-dashboard"), 1000);
    } catch (err) {
      console.error("❌ Error logging in:", err);
      setMsgType("error");
      const errMsg = err.response?.data?.message || "❌ Login failed. Check your email & password.";
      setMessage(errMsg);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fb-auth-wrap">
      <LiveBackground />
      <div className="card fb-auth-card shadow-lg p-4 position-relative" style={{ zIndex: 1 }}>
        <h2 className="text-center mb-2 text-success fw-bold">Supplier Login</h2>
        <p className="text-muted text-center mb-4">Enter your email and password</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 fb-btn" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        {message && (
          <p className={`text-center mt-3 fw-bold small ${msgType === "success" ? "text-success" : "text-danger"}`}>
            {message}
          </p>
        )}

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted small">OR</span>
          <hr className="flex-grow-1" />
        </div>

        <p className="text-center text-muted mt-3 mb-0 small">
          Don’t have an account?{" "}
          <Link to="/supplier-module/signup" className="text-success fw-semibold text-decoration-none">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SupLogin;
