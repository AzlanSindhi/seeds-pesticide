import mongoose from "mongoose";

const CustMasterSchema = new mongoose.Schema({
  cust_id: String,
  cust_name: String,
  email: String,
  password: String
});

const CustMaster = mongoose.model("CustMaster", CustMasterSchema, "cust_master");

export default CustMaster;
