import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_id: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    payment: String
  },
  items: [
    { _id: String, product_name: String, price: Number, count: Number }
  ],
  total: Number,
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "Processing", "Delivered"], default: "Pending" },
  sup_id: String
});

const Order = mongoose.model("Order", OrderSchema, "orders");

export default Order;
