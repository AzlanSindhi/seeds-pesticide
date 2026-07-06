import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import StaggerReveal from "../../components/ui/StaggerReveal";
import ScrollReveal from "../../components/ui/ScrollReveal";
import AnimatedCounter from "../../components/ui/AnimatedCounter";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    suppliers: 0,
    products: 0,
    orders: 0,
    reports: 0,
    totalSalesAmount: 0,
  });

  useEffect(() => {
    api.get("/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const cards = [
    { title: "Customers", value: stats.customers, link: "/user-module/cust", label: "Manage Customers" },
    { title: "Products", value: stats.products, link: "/user-module/products", label: "Manage Products" },
    {
      title: "Sales",
      value: stats.orders,
      extra: stats.totalSalesAmount,
      extraPrefix: "₹",
      link: "/user-module/sales",
      label: "View Sales",
    },
    { title: "Suppliers", value: stats.suppliers, link: "/user-module/supplier", label: "View Suppliers" },
    { title: "Reports", value: stats.reports, link: "/user-module/reports", label: "View Reports" },
  ];

  return (
    <div className="container py-4">
      <ScrollReveal variant="up">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <h2 className="mb-0">Welcome Admin</h2>
          <NavLink to="/" className="btn btn-sm btn-outline-light fb-btn">
            Back to Home
          </NavLink>
        </div>
      </ScrollReveal>

      <StaggerReveal className="row g-4 fb-admin-stats">
        {cards.map((card) => (
          <div key={card.title} className="col-sm-6 col-lg-4">
            <div className="card bg-secondary text-white fb-stat-card text-center p-4 h-100 border-0">
              <h5 className="mb-2">{card.title}</h5>
              <p className="fs-3 fw-bold mb-1">
                <AnimatedCounter value={card.value} />
              </p>
              {card.extra != null && (
                <p className="small opacity-75 mb-2">
                  Total:{" "}
                  <AnimatedCounter value={card.extra} prefix={card.extraPrefix || ""} />
                </p>
              )}
              <NavLink to={card.link} className="btn btn-sm btn-outline-light fb-btn mt-auto">
                {card.label}
              </NavLink>
            </div>
          </div>
        ))}
      </StaggerReveal>
    </div>
  );
};

export default Dashboard;
