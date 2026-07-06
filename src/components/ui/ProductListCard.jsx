import { useNavigate } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const ProductListCard = ({ product, categorySlug, onAddToCart, index = 0 }) => {
  const navigate = useNavigate();
  const imgSrc =
    product.image ||
    product.url ||
    `https://via.placeholder.com/150x150.png?text=${encodeURIComponent(product.product_name || "Product")}`;

  return (
    <ScrollReveal
      variant="left"
      className="col-12"
      style={{ transitionDelay: `${Math.min(index * 0.09, 0.45)}s` }}
    >
      <article className="card fb-product-card border-0 d-flex flex-row p-3 align-items-center">
        <img
          src={imgSrc}
          alt={product.product_name}
          className="rounded me-md-4 flex-shrink-0"
          width={150}
          height={150}
          loading="lazy"
          decoding="async"
        />
        <div className="flex-grow-1">
          <h4 className="fw-bold text-dark mb-2">{product.product_name}</h4>
          <p className="mb-1 text-muted small">
            <strong>Supplier:</strong> {product.supplier_id}
          </p>
          <p className="mb-3">
            <span className="fb-price-tag">₹{product.price}</span>
          </p>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-outline-success btn-sm fb-btn"
              onClick={() => navigate(`/products/${categorySlug}/${product._id}`)}
            >
              View Product
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm fb-btn"
              onClick={() => navigate("/checkout", { state: { product } })}
            >
              Buy Now
            </button>
            <button
              type="button"
              className="btn btn-warning text-white btn-sm fb-btn"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
};

export default ProductListCard;
