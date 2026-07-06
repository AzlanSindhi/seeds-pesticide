import { useEffect, useRef, useState } from "react";

const VARIANT_CLASS = {
  up: "fb-reveal--up",
  down: "fb-reveal--down",
  left: "fb-reveal--left",
  right: "fb-reveal--right",
  scale: "fb-reveal--scale",
  blur: "fb-reveal--blur",
};

const ScrollReveal = ({
  children,
  className = "",
  delayClass = "",
  variant = "up",
  as: Tag = "div",
  threshold = 0.1,
  style,
  once = true,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const variantClass = VARIANT_CLASS[variant] || VARIANT_CLASS.up;

  return (
    <Tag
      ref={ref}
      style={style}
      className={[
        "fb-reveal",
        variantClass,
        delayClass,
        visible ? "fb-reveal--visible" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
