import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const supplier = JSON.parse(localStorage.getItem("supplier"));

  useEffect(() => {
    if (!supplier) return;

    const fetchProducts = async () => {
      try {
        const res = await api.get(`/products/supplier/${supplier.sup_id}`);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [supplier]);

  if (loading) {
    return <p className="text-center mt-5">⏳ Loading products...</p>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">My Products</h2>
        <Link to="/supplier-module/addproducts" className="btn btn-success">
          + Add Product
        </Link>
      </div>

      <div className="card p-3 shadow-sm fb-table-wrap border-0">
        <h5 className="mb-3 text-success font-weight-bold">Product List</h5>
        <table className="table table-hover table-striped align-middle mb-0 bg-white">
          <thead className="table-success text-success">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, index) => (
                <tr key={p._id || p.id}>
                  <td>{index + 1}</td>
                  <td>{p.product_name}</td>
                  <td>{p.type}</td>
                  <td>{p.quantity}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <span className={`badge ${p.stocks < 10 ? "bg-danger" : "bg-success"}`}>
                      {p.stocks}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
