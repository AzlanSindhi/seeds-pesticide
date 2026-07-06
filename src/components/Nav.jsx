import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../public/FB-Logo.svg";
import rope from "../assets/rope.png";
import { useNavbarScroll } from "../hooks/useNavbarScroll";
import { useCartCount } from "../hooks/useCartCount";

const Nav = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const scrolled = useNavbarScroll();
  const cartCount = useCartCount();
  const prevCount = useRef(cartCount);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      prevCount.current = cartCount;
      return () => clearTimeout(t);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fb-navbar sticky-top ${scrolled ? "fb-navbar--scrolled" : ""}`}
    >
      <div className="container">
        <NavLink
          className="d-flex align-items-center navbar-brand text-warning fw-bold"
          to="/"
        >
          <img
            src={logo}
            className="img-fluid me-2 fb-brand-logo"
            alt="FarmBasket Logo"
            width={50}
            height={50}
            style={{ height: "50px" }}
          />
          FarmBasket
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src={rope} alt="" width={30} height={30} aria-hidden="true" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/category">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white position-relative" to="/cart">
                See Cart
                {cartCount > 0 && (
                  <span
                    className={`fb-cart-badge ${bump ? "fb-cart-badge--bump" : ""}`}
                    aria-label={`${cartCount} items in cart`}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              {user ? (
                <span className="nav-link text-white">
                  👋 Welcome Back Customer
                </span>
              ) : (
                <NavLink className="nav-link text-white" to="/login">
                  Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <NavLink to="/supplier-module/login" className="nav-link text-white">
                Become a Supplier
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-lg-2 fb-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
