const ProductListSkeleton = ({ count = 4 }) => (
  <div className="row g-4" aria-busy="true" aria-label="Loading products">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="col-12">
        <div className="fb-product-card d-flex flex-row p-3 gap-3 align-items-center border-0">
          <div
            className="fb-skeleton rounded flex-shrink-0"
            style={{ width: 150, height: 150 }}
          />
          <div className="flex-grow-1 w-100">
            <div className="fb-skeleton mb-3" style={{ height: 22, width: "55%" }} />
            <div className="fb-skeleton mb-2" style={{ height: 14, width: "40%" }} />
            <div className="fb-skeleton mb-3" style={{ height: 18, width: "25%" }} />
            <div className="d-flex gap-2">
              <div className="fb-skeleton rounded" style={{ height: 32, width: 100 }} />
              <div className="fb-skeleton rounded" style={{ height: 32, width: 80 }} />
              <div className="fb-skeleton rounded" style={{ height: 32, width: 90 }} />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProductListSkeleton;
