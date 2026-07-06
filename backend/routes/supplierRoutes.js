import express from "express";
import Supplier from "../models/Supplier.js";

const router = express.Router();

// ✅ Get all suppliers
router.get("/supplier", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete supplier by ID
router.delete("/supplier/:id", async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
