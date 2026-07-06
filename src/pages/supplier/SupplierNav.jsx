import { NavLink } from "react-router-dom";

const SupplierNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3 fb-supplier-nav sticky-top">
      <NavLink to="/supplier-module/sup-dashboard" className="navbar-brand fw-bold text-white">
        Supplier Panel
      </NavLink>
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#supplierNav"
        aria-controls="supplierNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="supplierNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/supplier-module/sup-dashboard" className="nav-link text-white">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/supplier-module/myproducts" className="nav-link text-white">
              My Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/supplier-module/orders" className="nav-link text-white">
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/supplier-module/sup-report" className="nav-link text-white">
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SupplierNav;
