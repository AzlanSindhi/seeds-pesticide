import { useState, useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import ScrollReveal from "../components/ui/ScrollReveal";
import api from "../services/api";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "COD",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setSubmitting(true);
    const orderData = {
      customer: formData,
      items: cartItems,
      total: totalPrice,
      date: new Date(),
    };

    try {
      const res = await api.post("/orders", orderData);

      if (res.status === 200 || res.status === 201) {
        alert("✅ Order placed successfully!");
        localStorage.removeItem("cart");
        setCartItems([]);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          payment: "COD",
        });
        window.location.href = "/";
      } else {
        alert("❌ Failed to place order.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("⚠️ Could not reach server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container fb-section">
      <PageHeader
        badge="Secure checkout"
        title="Checkout"
        subtitle="Complete your order — we deliver straight to your farm."
      />

      <div className="row g-4">
        <div className="col-lg-7">
          <ScrollReveal variant="left">
            <div className="card fb-card border-0 p-4">
              <h5 className="fw-bold text-success mb-3">Customer Information</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="checkout-name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="checkout-name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="checkout-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="checkout-email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="checkout-phone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="checkout-phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="checkout-address">
                    Shipping Address
                  </label>
                  <textarea
                    id="checkout-address"
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="checkout-payment">
                    Payment Method
                  </label>
                  <select
                    id="checkout-payment"
                    name="payment"
                    className="form-select"
                    value={formData.payment}
                    onChange={handleChange}
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="Card" disabled>
                      Credit/Debit Card (Coming Soon)
                    </option>
                    <option value="UPI" disabled>
                      UPI / Net Banking (Coming Soon)
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 fb-btn mt-2"
                  disabled={submitting || cartItems.length === 0}
                >
                  {submitting ? "Placing Order…" : "Place Order"}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>

        <div className="col-lg-5">
          <ScrollReveal variant="right" delayClass="fb-reveal-delay-2">
            <div className="card fb-card border-0 p-4">
              <h5 className="fw-bold text-success mb-3">Order Summary</h5>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item._id ?? item.id}
                    className="d-flex justify-content-between mb-2 small"
                  >
                    <span>
                      {item.product_name} × {item.count}
                    </span>
                    <span>₹{item.price * item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted">No items in cart</p>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span className="text-success fs-5">₹{totalPrice}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
