import ProductListSkeleton from "./ProductListSkeleton";

const LoadingState = ({ message = "Loading...", variant }) => {
  if (variant === "products") {
    return (
      <div className="container fb-section">
        <div className="fb-loading-center mb-4" style={{ minHeight: "12vh" }}>
          <div className="fb-spinner" aria-hidden="true" />
          <span>{message}</span>
        </div>
        <ProductListSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="fb-loading-center" role="status" aria-live="polite">
      <div className="fb-spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

export default LoadingState;
