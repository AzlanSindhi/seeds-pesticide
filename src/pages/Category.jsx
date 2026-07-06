import { useNavigate } from "react-router-dom";
import seedImg from "../assets/products/seeds.jpg";
import pestImg from "../assets/products/pesticide.webp";
import PageHeader from "../components/ui/PageHeader";
import StaggerReveal from "../components/ui/StaggerReveal";

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Seeds",
      description: "Explore high-quality seeds for all types of crops — hybrid, organic, and seasonal varieties.",
      image: seedImg,
      link: "/seeds",
      tag: "120+ varieties",
    },
    {
      id: 2,
      name: "Pesticides",
      description: "Protect your crops with safe, effective, and eco-conscious pest control solutions.",
      image: pestImg,
      link: "/pest-page",
      tag: "Certified safe",
    },
  ];

  return (
    <div className="container fb-section">
      <PageHeader
        badge="Shop by category"
        title="Product Categories"
        subtitle="Choose a category to browse certified products from trusted suppliers across India."
      />

      <StaggerReveal className="row g-4">
        {categories.map((cat) => (
          <div key={cat.id} className="col-md-6">
            <article
              className="card fb-card fb-card--interactive h-100 border-0 position-relative"
              onClick={() => navigate(cat.link)}
              onKeyDown={(e) => e.key === "Enter" && navigate(cat.link)}
              role="button"
              tabIndex={0}
              aria-label={`Browse ${cat.name}`}
            >
              <div className="fb-card-img-wrap position-relative">
                <img
                  src={cat.image}
                  className="card-img-top"
                  alt={cat.name}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="fb-card-overlay">Explore {cat.name} →</div>
              </div>
              <div className="card-body text-center">
                <span className="fb-badge-live d-inline-block mb-2">{cat.tag}</span>
                <h5 className="card-title fw-bold text-success">{cat.name}</h5>
                <p className="card-text text-muted mb-0">{cat.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center pb-4">
                <button
                  type="button"
                  className="btn btn-success fb-btn fb-btn-shine"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(cat.link);
                  }}
                >
                  View {cat.name}
                </button>
              </div>
            </article>
          </div>
        ))}
      </StaggerReveal>
    </div>
  );
};

export default Category;
