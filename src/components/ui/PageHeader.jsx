import ScrollReveal from "./ScrollReveal";

const PageHeader = ({ title, subtitle, badge, center = true }) => (
  <header className={`fb-page-header mb-5 ${center ? "text-center" : ""}`}>
    {badge && (
      <ScrollReveal variant="scale">
        <span className="fb-badge-live d-inline-block mb-3">{badge}</span>
      </ScrollReveal>
    )}
    <ScrollReveal variant="up">
      <h1 className={`fb-section-title ${center ? "" : "mb-2"}`}>{title}</h1>
    </ScrollReveal>
    {subtitle && (
      <ScrollReveal variant="blur" delayClass="fb-reveal-delay-1">
        <p
          className="text-muted mb-0 mx-auto fb-lead"
          style={{ maxWidth: center ? "40rem" : "none" }}
        >
          {subtitle}
        </p>
      </ScrollReveal>
    )}
    {center && <div className="fb-title-line mx-auto" aria-hidden="true" />}
  </header>
);

export default PageHeader;
