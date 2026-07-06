import express from "express";
import CustMaster from "../models/CustMaster.js";
import Customer from "../models/Customer.js";
import SupMaster from "../models/SupMaster.js";
import Supplier from "../models/Supplier.js";

const router = express.Router();

// ✅ Customer Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, address, dob } = req.body;

    const existing = await CustMaster.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "❌ Email already registered" });
    }

    const count = await CustMaster.countDocuments();
    const cust_id = `CUS${(count + 1).toString().padStart(3, "0")}`;

    const newCustomer = new CustMaster({ cust_id, cust_name: name, email, password });
    await newCustomer.save();

    const newCustomerProfile = new Customer({ id: cust_id, name, email, address, dob });
    await newCustomerProfile.save();

    res.json({ message: "✅ Signup successful", cust_id });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Customer Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await CustMaster.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      message: "✅ Login successful",
      cust_name: user.cust_name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Supplier Login
router.post("/supplier-module/sup-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const supplier = await SupMaster.findOne({ email, password });
    if (!supplier) {
      return res.status(401).json({ message: "❌ Invalid Email or Password" });
    }

    res.json({
      message: "✅ Login successful",
      sup_id: supplier.sup_id,
      supplier_name: supplier.supplier_name,
      email: supplier.email
    });
  } catch (err) {
    console.error("❌ Supplier login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Supplier Signup
router.post("/supplier-signup", async (req, res) => {
  const { name, contact, email, address, category, password } = req.body;
  try {
    const existing = await SupMaster.findOne({ email });
    if (existing) return res.status(400).json({ message: "❌ Email already registered" });

    const count = await SupMaster.countDocuments();
    const sup_id = `SUP${(count + 1).toString().padStart(3, "0")}`;

    const newSupplier = new Supplier({ sup_id, name, contact, email, address, category, products_supplied: [] });
    await newSupplier.save();

    const newSupMaster = new SupMaster({ sup_id, supplier_name: name, email, password });
    await newSupMaster.save();

    res.json({ message: "✅ Supplier registered successfully. Wait for admin approval.", sup_id });
  } catch (err) {
    console.error("❌ Supplier signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
