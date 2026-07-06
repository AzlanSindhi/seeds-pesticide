import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fb-admin-nav px-3">
      <NavLink to="/user-module/dashboard" className="navbar-brand fw-bold">
        Admin Panel
      </NavLink>
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNav"
        aria-controls="adminNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="adminNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/user-module/dashboard" className="nav-link">Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-module/cust" className="nav-link">Customers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-module/products" className="nav-link">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-module/sales" className="nav-link">Sales</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-module/supplier" className="nav-link">Supplier</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-module/reports" className="nav-link">Reports</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;
