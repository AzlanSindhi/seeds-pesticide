import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
  sup_id: { type: String, unique: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, enum: ["Seeds", "Pesticides", "Both"], required: true },
  products_supplied: { type: [String], default: [] }
});

const Supplier = mongoose.model("Supplier", SupplierSchema, "supplier");

export default Supplier;
