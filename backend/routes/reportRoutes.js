import express from "express";
import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Admin Dashboard Quick Stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    const customerCount = await Customer.countDocuments();
    const supplierCount = await Supplier.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();

    const totalSalesAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    res.json({
      customers: customerCount,
      suppliers: supplierCount,
      products: productCount,
      sales: orderCount,
      totalSalesAmount: totalSalesAgg[0]?.total || 0,
      reports: 9
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Overall Reports (Sales, products sold category-wise, top selling products)
router.get("/reports", async (req, res) => {
  try {
    const orders = await Order.find();

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;

    const productsSold = {};
    for (let order of orders) {
      for (let item of order.items) {
        const product = await Product.findOne({ product_name: item.product_name });
        if (!product) continue;

        const cat = product.type || "Unknown";
        if (!productsSold[cat]) productsSold[cat] = { totalQuantity: 0 };
        productsSold[cat].totalQuantity += item.count;
      }
    }

    const productMap = {};
    for (let order of orders) {
      for (let item of order.items) {
        if (!productMap[item.product_name]) productMap[item.product_name] = 0;
        productMap[item.product_name] += item.price * item.count;
      }
    }

    const topProducts = Object.entries(productMap)
      .sort((a, b) => b[1] - a[1]) // sort by sales amount
      .slice(0, 5)
      .map(([name, sales]) => ({ name, sales }));

    res.json({
      totalSales,
      totalOrders,
      productsSold,
      topProducts
    });
  } catch (err) {
    console.error("❌ Reports error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Supplier Reports by Month
router.get("/reports/:month", async (req, res) => {
  try {
    const { month } = req.params;
    const { sup_id } = req.query;

    if (!sup_id) {
      return res.status(400).json({ message: "Supplier ID (sup_id) is required" });
    }

    // Convert month name -> index
    const monthIndex = new Date(`${month} 1, 2025`).getMonth();
    const year = 2025; // standard reference year

    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 1);

    // Find orders in this month
    const orders = await Order.find({
      date: { $gte: start, $lt: end }
    });

    let totalSales = 0;
    let totalOrders = 0;
    const productsSold = {};
    const productMap = {};

    for (let order of orders) {
      const supplierItems = [];
      for (let item of order.items) {
        const product = await Product.findOne({ product_name: item.product_name });
        if (!product) continue;

        if (product.sup_id === sup_id) {
          supplierItems.push(item);

          const cat = product.type || "Unknown";
          if (!productsSold[cat]) productsSold[cat] = { totalQuantity: 0 };
          productsSold[cat].totalQuantity += item.count;

          if (!productMap[item.product_name]) productMap[item.product_name] = 0;
          productMap[item.product_name] += item.price * item.count;

          totalSales += item.price * item.count;
        }
      }

      if (supplierItems.length > 0) {
        totalOrders += 1;
      }
    }

    const topProducts = Object.entries(productMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, sales]) => ({ name, sales }));

    res.json({
      totalSalesAmount: totalSales,
      totalOrders,
      productsSummary: Object.entries(productsSold).map(([category, obj]) => ({
        category,
        count: obj.totalQuantity
      })),
      topProducts
    });
  } catch (err) {
    console.error("❌ Supplier report error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Overall Supplier Reports API
router.get("/supplier-reports", async (req, res) => {
  try {
    const { sup_id } = req.query;

    if (!sup_id) {
      return res.status(400).json({ message: "Supplier ID (sup_id) is required" });
    }

    const orders = await Order.find();

    let totalSales = 0;
    let totalOrders = 0;
    const productsSold = {};
    const productMap = {};

    for (let order of orders) {
      let supplierOrder = false;

      for (let item of order.items) {
        const product = await Product.findOne({ product_name: item.product_name });
        if (!product) continue;

        if (product.supplier_id === sup_id) {
          supplierOrder = true;

          const cat = product.type || "Unknown";
          if (!productsSold[cat]) productsSold[cat] = { totalQuantity: 0 };
          productsSold[cat].totalQuantity += item.count;

          if (!productMap[item.product_name]) productMap[item.product_name] = 0;
          productMap[item.product_name] += item.price * item.count;

          totalSales += item.price * item.count;
        }
      }

      if (supplierOrder) {
        totalOrders += 1;
      }
    }

    const topProducts = Object.entries(productMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, sales]) => ({ name, sales }));

    res.json({
      totalSalesAmount: totalSales,
      totalOrders,
      productsSummary: Object.entries(productsSold).map(([category, obj]) => ({
        category,
        count: obj.totalQuantity
      })),
      topProducts
    });
  } catch (err) {
    console.error("❌ Supplier report error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
