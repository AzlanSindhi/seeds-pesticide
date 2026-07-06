import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import ScrollReveal from "../components/ui/ScrollReveal";
import { notifyCartUpdate } from "../hooks/useCartCount";

const getItemId = (item) => item._id ?? item.id;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    notifyCartUpdate();
  }, [cartItems]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => getItemId(item) !== id));
  };

  const updateCount = (id, type) => {
    setCartItems(
      cartItems.map((item) =>
        getItemId(item) === id
          ? {
              ...item,
              count:
                type === "inc"
                  ? item.count + 1
                  : item.count > 1
                  ? item.count - 1
                  : 1,
            }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className="container fb-section">
      <PageHeader
        badge="Your order"
        title="🛒 Your Cart"
        subtitle={
          cartItems.length
            ? `${cartItems.reduce((s, i) => s + i.count, 0)} items ready for checkout`
            : "Add products from our catalog to get started"
        }
      />

      {cartItems.length === 0 ? (
        <ScrollReveal variant="scale">
          <div className="fb-empty">
            <p className="fs-4 mb-2">Your cart is empty</p>
            <p className="text-muted mb-4">Discover seeds and pesticides tailored for your farm.</p>
            <button
              type="button"
              className="btn btn-success fb-btn fb-btn-shine"
              onClick={() => navigate("/category")}
            >
              Browse Products
            </button>
          </div>
        </ScrollReveal>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item, index) => {
              const itemId = getItemId(item);
              return (
                <ScrollReveal
                  key={itemId}
                  variant="left"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                  className="mb-3"
                >
                  <article className="card fb-product-card border-0 p-3">
                    <div className="row g-0 align-items-center">
                      <div className="col-4 col-md-3">
                        <img
                          src={item.image || item.url}
                          alt={item.product_name}
                          className="img-fluid rounded"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="col-8 col-md-6">
                        <h5 className="fw-bold text-success">{item.product_name}</h5>
                        <p className="mb-1 small">
                          <strong>Supplier:</strong> {item.supplier_id}
                        </p>
                        <p className="mb-2">
                          <span className="fb-price-tag">₹{item.price}</span>
                        </p>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm"
                            onClick={() => updateCount(itemId, "dec")}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="fw-bold">{item.count}</span>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm"
                            onClick={() => updateCount(itemId, "inc")}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-12 col-md-3 text-md-end mt-3 mt-md-0">
                        <p className="fw-bold text-success mb-2">
                          ₹{item.price * item.count}
                        </p>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm fb-btn"
                          onClick={() => removeItem(itemId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="col-lg-4">
            <ScrollReveal variant="right" delayClass="fb-reveal-delay-2">
              <div className="card fb-card border-0 p-4 sticky-top" style={{ top: "5.5rem" }}>
                <h5 className="fw-bold text-success">Cart Summary</h5>
                <hr />
                <p className="d-flex justify-content-between mb-2">
                  <span>Total Items:</span>
                  <span>{cartItems.reduce((sum, i) => sum + i.count, 0)}</span>
                </p>
                <p className="d-flex justify-content-between mb-3">
                  <span>Total Price:</span>
                  <span className="fw-bold text-success fs-5">₹{totalPrice}</span>
                </p>
                <button
                  type="button"
                  className="btn btn-success w-100 fb-btn fb-btn-shine"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
