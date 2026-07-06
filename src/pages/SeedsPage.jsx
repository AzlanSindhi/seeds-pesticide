import { useEffect, useState, useCallback } from "react";
import ProductListCard from "../components/ui/ProductListCard";
import LoadingState from "../components/ui/LoadingState";
import PageHeader from "../components/ui/PageHeader";
import { showToast } from "../components/ui/Toast";
import { notifyCartUpdate } from "../hooks/useCartCount";
import api from "../services/api";

const SeedsPage = () => {
  const [seeds, setSeeds] = useState([]);
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
    api.get("/products/type/Seeds")
      .then((res) => {
        setSeeds(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching seeds:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = useCallback((seed) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c._id === seed._id);
      if (existingItem) {
        return prevCart.map((c) =>
          c._id === seed._id ? { ...c, count: c.count + 1 } : c
        );
      }
      return [...prevCart, { ...seed, count: 1 }];
    });
    notifyCartUpdate();
    showToast(`${seed.product_name} added to cart ✅`);
  }, []);

  if (loading) return <LoadingState message="Loading seeds..." variant="products" />;

  return (
    <div className="container fb-section">
      <PageHeader
        badge="Seeds"
        title="Available Seeds"
        subtitle="Premium hybrid and organic seeds from verified suppliers — ready for your next season."
      />
      <div className="row g-4">
        {seeds.length > 0 ? (
          seeds.map((seed, index) => (
            <ProductListCard
              key={seed._id}
              product={seed}
              categorySlug="seeds"
              onAddToCart={addToCart}
              index={index}
            />
          ))
        ) : (
          <div className="fb-empty col-12">
            <p className="fs-5">No seeds available at the moment.</p>
            <p className="text-muted small">Check back soon — new stock arrives weekly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeedsPage;
