import React, { useState } from "react";
import api from "../../services/api";

const AddProduct = () => {
  const supplier = JSON.parse(localStorage.getItem("supplier")); // Get supplier from localStorage

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Seeds",
    quantity: "",
    price: "",
    description: "",
    pricePerQuantity: "",
    howToUse: "",
    benefits: "",
    stocks: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supplier) {
      alert("⚠️ Please log in as a supplier first.");
      return;
    }

    try {
      // Prepare product object matching backend schema
      const productData = {
        product_name: newProduct.name,
        type: newProduct.category,
        quantity: newProduct.quantity,
        price: Number(newProduct.price),
        description: newProduct.description,
        how_to_use: newProduct.howToUse,
        benefits: newProduct.benefits
          ? newProduct.benefits.split(",").map((b) => b.trim())
          : [],
        supplier_id: supplier.sup_id,
        status: "In Stock",
        stocks: Number(newProduct.stocks || 0)
      };

      const res = await api.post("/products", productData);

      alert("✅ Product added successfully!");
      setNewProduct({
        name: "",
        category: "Seeds",
        quantity: "",
        price: "",
        description: "",
        pricePerQuantity: "",
        howToUse: "",
        benefits: "",
        stocks: ""
      });
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("❌ Failed to add product. Check console for details.");
    }
  };

  return (
    <div className="container py-4 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4 w-100 border-0"
        style={{ maxWidth: "900px", borderRadius: "20px" }}
      >
        <h2 className="fw-bold text-success mb-4 text-center">
          🌱 Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <select
              name="category"
              className="form-select"
              value={newProduct.category}
              onChange={handleChange}
            >
              <option>Seeds</option>
              <option>Pesticides</option>
              <option>Fertilizers</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="quantity"
              className="form-control"
              placeholder="Quantity (e.g. 5 kg)"
              value={newProduct.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Total Price (₹)"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="stocks"
              className="form-control"
              placeholder="Stock Count"
              value={newProduct.stocks}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <textarea
              name="description"
              className="form-control"
              rows="2"
              placeholder="Short Description"
              value={newProduct.description}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <textarea
              name="howToUse"
              className="form-control"
              rows="2"
              placeholder="How to Use"
              value={newProduct.howToUse}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <textarea
              name="benefits"
              className="form-control"
              rows="2"
              placeholder="Benefits (comma separated)"
              value={newProduct.benefits}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12 d-flex align-items-center">
            <button className="btn btn-success w-100 fw-bold" type="submit">
              ✅ Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
