import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get products by product type (Seeds / Pesticides)
router.get("/products/type/:type", async (req, res) => {
  try {
    const products = await Product.find({ type: req.params.type });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get products supplied by a specific supplier ID
router.get("/products/supplier/:sup_id", async (req, res) => {
  try {
    const products = await Product.find({ supplier_id: req.params.sup_id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a new product
router.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update product by ID
router.put("/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
