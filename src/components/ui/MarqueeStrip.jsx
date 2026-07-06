const DEFAULT_ITEMS = [
  "Certified Seeds",
  "Eco-Safe Pesticides",
  "Doorstep Delivery",
  "Trusted Suppliers",
  "Transparent Pricing",
  "Farmer-First Support",
];

const MarqueeStrip = ({ items = DEFAULT_ITEMS }) => {
  const track = [...items, ...items];

  return (
    <div className="fb-marquee py-3" aria-hidden="true">
      <div className="fb-marquee-track">
        {track.map((label, i) => (
          <span key={`${label}-${i}`} className="fb-marquee-item">
            {label}
            <span className="fb-marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
