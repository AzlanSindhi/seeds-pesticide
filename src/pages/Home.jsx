import heroImage from "../assets/Hero-Test1.jpeg";
import { NavLink } from "react-router-dom";
import ScrollReveal from "../components/ui/ScrollReveal";
import StaggerReveal from "../components/ui/StaggerReveal";
import LiveBackground from "../components/ui/LiveBackground";
import MarqueeStrip from "../components/ui/MarqueeStrip";
import AnimatedCounter from "../components/ui/AnimatedCounter";

const features = [
  {
    icon: "🌱",
    title: "Quality Seeds",
    text: "Organic and hybrid seeds tested for better yield and growth.",
  },
  {
    icon: "🛡️",
    title: "Safe Pesticides",
    text: "Eco-friendly and effective pest control solutions to protect crops.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    text: "Get seeds and pesticides delivered quickly to your doorstep.",
  },
];

const steps = [
  { num: 1, title: "Browse", text: "Explore seeds and pesticides by category." },
  { num: 2, title: "Order", text: "Add to cart or buy instantly with secure checkout." },
  { num: 3, title: "Grow", text: "Receive quality products and grow with confidence." },
];

const Home = () => {
  return (
    <div>
      <section className="fb-section fb-section--hero" id="home">
        <LiveBackground />
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-md-6 text-center text-md-start fb-hero-enter">
              <div className="fb-hero-badges justify-content-center justify-content-md-start">
                <span className="fb-pill">✓ Certified Products</span>
                <span className="fb-pill">🚚 Fast Delivery</span>
              </div>
              <h1 className="fb-display text-success">
                Get Best Farming Products
              </h1>
              <p className="fb-lead mb-4">
                🌱 Grow More, Worry Less — <strong>FarmBasket</strong> Delivers
                Success!
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                <NavLink
                  to="/category"
                  className="btn btn-success btn-lg fb-btn fb-btn-lg fb-cta-pulse fb-btn-shine"
                >
                  Browse Products 🚜
                </NavLink>
                <NavLink
                  to="/about"
                  className="btn btn-outline-success btn-lg fb-btn"
                >
                  Learn More
                </NavLink>
              </div>
            </div>

            <div className="col-md-6 text-center mt-4 mt-md-0 fb-hero-enter-delay">
              <div className="fb-hero-float d-inline-block">
                <img
                  src={heroImage}
                  alt="Farming products and healthy crops"
                  className="img-fluid fb-hero-img"
                  width={640}
                  height={400}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fb-marquee-wrap">
        <MarqueeStrip />
      </div>

      <section className="container py-5">
        <ScrollReveal variant="scale">
          <div className="fb-stats-row">
            <div className="fb-stat-pill">
              <strong>
                <AnimatedCounter value={500} suffix="+" />
              </strong>
              <span>Happy Farmers</span>
            </div>
            <div className="fb-stat-pill">
              <strong>
                <AnimatedCounter value={120} suffix="+" />
              </strong>
              <span>Quality Products</span>
            </div>
            <div className="fb-stat-pill">
              <strong>
                <AnimatedCounter value={48} suffix="h" />
              </strong>
              <span>Avg. Delivery</span>
            </div>
            <div className="fb-stat-pill">
              <strong>
                <AnimatedCounter value={98} suffix="%" />
              </strong>
              <span>Satisfaction</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="container fb-section pt-0">
        <ScrollReveal>
          <h2 className="text-center fb-section-title">Why FarmBasket</h2>
          <p className="text-center text-muted mx-auto mb-5" style={{ maxWidth: "32rem" }}>
            Everything you need for a successful harvest — in one trusted place.
          </p>
        </ScrollReveal>
        <StaggerReveal className="row text-center g-4">
          {features.map((f) => (
            <div key={f.title} className="col-md-4">
              <div className="card h-100 fb-card fb-card--feature border-0">
                <div className="card-body">
                  <span className="fb-feature-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <h3 className="card-title text-success">{f.title}</h3>
                  <p className="card-text text-muted mb-0">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </section>

      <section className="container fb-section pt-0">
        <ScrollReveal>
          <h2 className="text-center fb-section-title">How It Works</h2>
        </ScrollReveal>
        <StaggerReveal className="fb-process mt-4">
          {steps.map((s) => (
            <div key={s.num} className="fb-step">
              <div className="fb-step-num">{s.num}</div>
              <h4 className="fw-bold text-success">{s.title}</h4>
              <p className="text-muted small mb-0">{s.text}</p>
            </div>
          ))}
        </StaggerReveal>
      </section>

      <section className="fb-cta-section text-white text-center fb-section shadow-sm">
        <div className="container">
          <ScrollReveal variant="scale">
            <h2 className="fw-bold mb-3">Start Your Farming Journey Today!</h2>
            <p className="lead mb-4 opacity-90">
              Buy our premium seeds and pesticides to ensure better crop growth and
              protection.
            </p>
            <NavLink
              to="/category"
              className="btn btn-light btn-lg fw-bold fb-btn fb-btn-lg fb-btn-shine"
            >
              Shop Now 🌾
            </NavLink>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
