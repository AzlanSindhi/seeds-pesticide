import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fb-footer text-white text-center mt-auto">
      <div className="container">
        <p className="mb-2">
          &copy; {new Date().getFullYear()}{" "}
          <span className="fw-bold text-warning">FarmBasket</span>. All rights reserved.
        </p>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          <NavLink className="text-white text-decoration-none" to="/about">
            About Us
          </NavLink>
          <NavLink className="text-white text-decoration-none" to="/contact">
            Contact
          </NavLink>
          <NavLink className="text-white text-decoration-none" to="/category">
            Shop
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
