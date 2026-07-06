import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-white">Products Management</h2>

      <div className="table-responsive fb-table-wrap">
        <table className="table table-dark table-striped table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Supplier ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id || product.id}>
                  <td>{index + 1}</td>
                  <td>{product.product_name}</td>
                  <td>{product.type}</td>
                  <td>{product.price?.toLocaleString()}</td>
                  <td>{product.quantity}</td>
                  <td>{product.supplier_id}</td>
                  <td>
                    <NavLink
                      to={`/products/${product.type?.toLowerCase() === "seeds" ? "seeds" : "pesticides"}/${product._id}`}
                      className="btn btn-sm btn-outline-info me-2"
                    >
                      View
                    </NavLink>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
