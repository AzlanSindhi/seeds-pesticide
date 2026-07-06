import ScrollReveal from "../components/ui/ScrollReveal";
import PageHeader from "../components/ui/PageHeader";
import StaggerReveal from "../components/ui/StaggerReveal";

const highlights = [
  { icon: "🌾", title: "Certified Seeds", text: "Tested varieties for higher yield" },
  { icon: "🛡️", title: "Safe Protection", text: "Eco-conscious pesticide options" },
  { icon: "🚚", title: "Fast Delivery", text: "Doorstep shipping across regions" },
];

const AboutUs = () => {
  return (
    <div className="fb-section fb-section--muted">
      <div className="container">
        <PageHeader
          badge="Our story"
          title="About FarmBasket"
          subtitle="Your trusted digital marketplace connecting farmers with quality agricultural products."
        />

        <ScrollReveal variant="scale">
          <div
            className="card fb-card border-0 p-4 p-md-5 mx-auto mb-5"
            style={{ maxWidth: "52rem", backgroundColor: "#e8f5e9" }}
          >
            <p className="fs-5 text-dark mb-4">
              Welcome to <span className="fw-bold text-success">FarmBasket</span> –
              your trusted partner in agriculture. We provide farmers with
              <span className="fw-bold"> high-quality seeds</span> and
              <span className="fw-bold"> safe, effective pesticides</span> to help
              increase crop yield and ensure sustainable farming practices.
            </p>

            <p className="text-dark mb-4">
              Our mission is to empower farmers by offering reliable products,
              transparent pricing, and doorstep delivery – making farming
              <span className="fw-bold text-success"> easier, safer, and more profitable.</span>
            </p>

            <p className="text-dark mb-0">
              With FarmBasket, farmers gain access to certified seeds, crop protection
              solutions, and continuous support to grow a healthier, greener future. 🌾🌱
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="row g-4 text-center">
          {highlights.map((h) => (
            <div key={h.title} className="col-md-4">
              <div className="card fb-card border-0 p-4 h-100">
                <span className="fb-feature-icon">{h.icon}</span>
                <h4 className="text-success fw-bold">{h.title}</h4>
                <p className="text-muted small mb-0">{h.text}</p>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
};

export default AboutUs;
