import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingState from "../components/ui/LoadingState";
import ScrollReveal from "../components/ui/ScrollReveal";
import StaggerReveal from "../components/ui/StaggerReveal";
import { showToast } from "../components/ui/Toast";
import { notifyCartUpdate } from "../hooks/useCartCount";
import api from "../services/api";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    setCart((prev) => {
      const existingItem = prev.find((c) => c._id === product._id);
      if (existingItem) {
        return prev.map((c) =>
          c._id === product._id ? { ...c, count: c.count + 1 } : c
        );
      }
      return [...prev, { ...product, count: 1 }];
    });
    notifyCartUpdate();
    showToast(`${product.product_name} added to cart ✅`);
  }, [product]);

  const handleBuyNow = () => navigate("/checkout", { state: { product } });

  if (loading) return <LoadingState message="Loading product..." />;
  if (!product) {
    return (
      <div className="fb-empty">
        <h2 className="text-danger">Product Not Found</h2>
      </div>
    );
  }

  const imgSrc =
    product.url ||
    product.image ||
    "https://via.placeholder.com/400x400.png?text=No+Image";

  const detailBlocks = [
    product.how_to_use && {
      title: "How to Use",
      content: <p className="text-muted mb-0">{product.how_to_use}</p>,
    },
    product.benefits?.length > 0 && {
      title: "Benefits",
      content: (
        <ul className="text-muted mb-0">
          {product.benefits.map((b, idx) => (
            <li key={idx}>{b}</li>
          ))}
        </ul>
      ),
    },
  ].filter(Boolean);

  return (
    <div className="container fb-section">
      <ScrollReveal variant="scale">
        <div className="card fb-card border-0 p-4">
          <div className="row align-items-center g-4">
            <div className="col-md-5">
              <div className="fb-hero-float">
                <img
                  src={imgSrc}
                  alt={product.product_name}
                  className="img-fluid rounded fb-hero-img"
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="col-md-7">
              <span className="fb-badge-live d-inline-block mb-2">In stock</span>
              <h2 className="text-success fw-bold mb-3">{product.product_name}</h2>
              <p className="mb-2 text-muted">
                <strong>Supplier:</strong> {product.supplier_id}
              </p>
              <p className="mb-4">
                <span className="fb-price-tag fs-5">
                  ₹{product.price} / {product.quantity}
                </span>
              </p>
              <p className="text-muted mb-4">
                {product.description || "No description available."}
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-success fb-btn fb-btn-shine" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button type="button" className="btn btn-outline-success fb-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {detailBlocks.length > 0 && (
        <StaggerReveal className="row g-4 mt-2">
          {detailBlocks.map((block) => (
            <div key={block.title} className="col-md-6">
              <div className="card fb-card border-0 p-4 h-100">
                <h4 className="text-success fw-bold mb-3">{block.title}</h4>
                {block.content}
              </div>
            </div>
          ))}
        </StaggerReveal>
      )}

      <ScrollReveal variant="up" className="mt-4">
        <div className="card fb-card border-0 p-4">
          <h4 className="text-success fw-bold mb-2">Customer Reviews</h4>
          <p className="text-muted mb-0">Reviews feature coming soon...</p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ProductPage;
