import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Get all orders (with optional supplier filtering)
router.get("/orders", async (req, res) => {
  try {
    const { sup_id } = req.query;
    const filter = sup_id ? { sup_id } : {}; // Admin gets all, supplier gets their own
    const orders = await Order.find(filter).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Post / Save a new order
router.post("/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "✅ Order saved successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete order by ID
router.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update order status by ID
router.put("/orders/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ message: "✅ Order updated successfully", order: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
