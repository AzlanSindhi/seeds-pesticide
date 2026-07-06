import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import StaggerReveal from "../../components/ui/StaggerReveal";
import ScrollReveal from "../../components/ui/ScrollReveal";
import AnimatedCounter from "../../components/ui/AnimatedCounter";
import api from "../../services/api";

const SupplierDashboard = () => {
  const [supplier, setSupplier] = useState(null);
  const [stats, setStats] = useState({
    products: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalEarnings: 0,
    lowStock: 0,
    reports: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();

  const cardGradient = "linear-gradient(135deg, #1e88e5, #42a5f5)";

  useEffect(() => {
    const storedSupplier = localStorage.getItem("supplier");
    if (!storedSupplier) return navigate("/supplier-module/login");

    const sup = JSON.parse(storedSupplier);
    setSupplier(sup);

    api.get(`/products/supplier/${sup.sup_id}`)
      .then((res) => {
        const products = res.data;
        const lowStock = products.filter((p) => p.stocks < 10).length;
        setStats((prev) => ({ ...prev, products: products.length, lowStock }));
      })
      .catch((err) => console.error("Error fetching supplier products stats:", err));

    api.get(`/orders?sup_id=${sup.sup_id}`)
      .then((res) => {
        const orders = res.data;
        const pending = orders.filter((o) => o.status === "Pending").length;
        const delivered = orders.filter((o) => o.status === "Delivered").length;
        const earnings = orders.reduce((sum, o) => sum + o.total, 0);

        setStats((prev) => ({
          ...prev,
          pendingOrders: pending,
          deliveredOrders: delivered,
          totalEarnings: earnings,
          reports: 9,
        }));

        setRecentOrders(
          orders.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
        );
      })
      .catch((err) => console.error("Error fetching supplier orders stats:", err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("supplier");
    navigate("/supplier-module/login");
  };

  const cards = [
    { title: "My Products", value: stats.products, link: "/supplier-module/myproducts" },
    { title: "Pending Orders", value: stats.pendingOrders, link: "/supplier-module/orders" },
    { title: "Delivered Orders", value: stats.deliveredOrders, link: "/supplier-module/orders" },
    { title: "Total Earnings", value: stats.totalEarnings, prefix: "₹", link: "/supplier-module/sup-report" },
    { title: "Low Stock Items", value: stats.lowStock, link: "/supplier-module/myproducts" },
    { title: "Reports", value: stats.reports, link: "/supplier-module/sup-report" },
  ];

  return (
    <div className="container py-4">
      <ScrollReveal variant="up">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <h2 className="fw-bold text-dark mb-0">
            Welcome, {supplier?.supplier_name || "Supplier"}
          </h2>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-primary btn-sm fb-btn" onClick={() => navigate("/")}>
              Home
            </button>
            <button type="button" className="btn btn-outline-danger btn-sm fb-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </ScrollReveal>

      <StaggerReveal className="row g-4">
        {cards.map((card) => (
          <div key={card.title} className="col-md-6 col-lg-4">
            <div
              className="card text-white fb-supplier-stat text-center p-4 h-100"
              style={{ background: cardGradient }}
            >
              <h5 className="mb-2">{card.title}</h5>
              <p className="fs-3 fw-bold mb-3">
                <AnimatedCounter value={card.value} prefix={card.prefix || ""} />
              </p>
              <NavLink to={card.link} className="btn btn-sm btn-light fb-btn mt-auto">
                View
              </NavLink>
            </div>
          </div>
        ))}
      </StaggerReveal>

      <ScrollReveal variant="up" className="mt-5">
        <h4 className="text-dark fw-semibold mb-3">Recent Orders</h4>
        <div className="fb-table-wrap">
          <table className="table table-hover mb-0 bg-white">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Buyer</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.items.map((i) => i.product_name).join(", ")}</td>
                    <td>{order.customer.name}</td>
                    <td>{order.items.reduce((sum, i) => sum + i.count, 0)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    No recent orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default SupplierDashboard;
