import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: String,
  product_name: String,
  type: String,
  quantity: String,
  price: Number,
  description: String,
  how_to_use: String,
  benefits: [String],
  supplier_id: String,
  status: String,
  stocks: Number,
  url: String
});

const Product = mongoose.model("Product", ProductSchema, "products");

export default Product;
