import { useEffect, useState, useCallback } from "react";
import ProductListCard from "../components/ui/ProductListCard";
import LoadingState from "../components/ui/LoadingState";
import PageHeader from "../components/ui/PageHeader";
import { showToast } from "../components/ui/Toast";
import { notifyCartUpdate } from "../hooks/useCartCount";
import api from "../services/api";

const PestPage = () => {
  const [pests, setPests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (cartLoaded) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, cartLoaded]);

  useEffect(() => {
    api.get("/products/type/Pesticides")
      .then((res) => {
        setPests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pesticides:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = useCallback((pest) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c._id === pest._id);
      if (existingItem) {
        return prevCart.map((c) =>
          c._id === pest._id ? { ...c, count: c.count + 1 } : c
        );
      }
      return [...prevCart, { ...pest, count: 1 }];
    });
    notifyCartUpdate();
    showToast(`${pest.product_name} added to cart ✅`);
  }, []);

  if (loading) return <LoadingState message="Loading pesticides..." variant="products" />;

  return (
    <div className="container fb-section">
      <PageHeader
        badge="Pesticides"
        title="Available Pesticides"
        subtitle="Safe, effective crop protection — eco-conscious formulas trusted by farmers nationwide."
      />
      <div className="row g-4">
        {pests.length > 0 ? (
          pests.map((pest, index) => (
            <ProductListCard
              key={pest._id}
              product={pest}
              categorySlug="pests"
              onAddToCart={addToCart}
              index={index}
            />
          ))
        ) : (
          <div className="fb-empty col-12">
            <p className="fs-5">No pesticides available at the moment.</p>
            <p className="text-muted small">Check back soon for new listings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PestPage;
