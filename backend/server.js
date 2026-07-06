import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes imports
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Load env variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Endpoints
app.use("/", authRoutes);
app.use("/", customerRoutes);
app.use("/", supplierRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);
app.use("/", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
