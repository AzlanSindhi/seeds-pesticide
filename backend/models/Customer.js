import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  address: String,
  dob: String
});

const Customer = mongoose.model("Customer", CustomerSchema, "customers");

export default Customer;
