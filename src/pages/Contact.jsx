import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import ScrollReveal from "../components/ui/ScrollReveal";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback! We will reach out soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="fb-section fb-section--muted">
      <div className="container">
        <PageHeader
          badge="Get in touch"
          title="Contact Us"
          subtitle="Questions, feedback, or partnership inquiries — we'd love to hear from you."
        />

        <div className="row justify-content-center g-4">
          <div className="col-md-5">
            <ScrollReveal variant="left">
              <div className="card fb-card border-0 p-4 h-100">
                <h4 className="text-dark fw-semibold">Our Address</h4>
                <p className="text-muted mb-0">
                  FarmBasket Headquarters <br />
                  Valasd, Gujarat – 396001 <br />
                  India
                </p>
                <h5 className="text-success fw-semibold mt-4">Email</h5>
                <p className="text-muted mb-0">support@farmbasket.in</p>
                <h5 className="text-success fw-semibold mt-4">Hours</h5>
                <p className="text-muted mb-0 small">Mon – Sat, 9:00 AM – 6:00 PM IST</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-md-7">
            <ScrollReveal variant="right" delayClass="fb-reveal-delay-1">
              <div className="card fb-card border-0 p-4">
                <h4 className="text-dark fw-semibold mb-3">Send Us Feedback</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control"
                      rows="4"
                      placeholder="Write your feedback here..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100 fb-btn fb-btn-shine">
                    Send Feedback
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
