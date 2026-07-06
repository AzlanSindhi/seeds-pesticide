import mongoose from "mongoose";

const SupMasterSchema = new mongoose.Schema({
  sup_id: String,
  supplier_name: String,
  email: String,
  password: String
});

const SupMaster = mongoose.model("SupMaster", SupMasterSchema, "supplier_master");

export default SupMaster;
