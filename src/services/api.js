import axios from "axios";
import { initializeMockDb, mockDb } from "./mockDb";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Activate mock offline database if:
// 1. VITE_OFFLINE_MODE env variable is true
// 2. "offline_mode" is set to "true" in localStorage
// 3. Hosted on static web hosts (GitHub Pages, Vercel, etc.) i.e., hostname is not localhost/127.0.0.1
const isOffline =
  import.meta.env.VITE_OFFLINE_MODE === "true" ||
  localStorage.getItem("offline_mode") === "true" ||
  (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1");

if (isOffline) {
  initializeMockDb();
}

// Custom Axios Adapter to intercept requests and route them to localStorage Mock DB when offline
const offlineAdapter = (config) => {
  return new Promise((resolve, reject) => {
    try {
      const { url, method, data, params } = config;
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      let responseData = null;

      // Extract path without base URL / query parameters
      let cleanUrl = url;
      if (cleanUrl.startsWith("http")) {
        // Strip out base url
        cleanUrl = cleanUrl.replace(API_URL, "");
      }
      // Remove query string if any
      const queryIdx = cleanUrl.indexOf("?");
      if (queryIdx !== -1) {
        cleanUrl = cleanUrl.substring(0, queryIdx);
      }

      console.log(`[Mock API] Intercepted Request: ${method?.toUpperCase()} ${cleanUrl}`, { params, data: parsedData });

      // Match routes
      // 1. Authentication
      if (cleanUrl === "/login" && method === "post") {
        responseData = mockDb.loginCustomer(parsedData.email, parsedData.password);
      } else if (cleanUrl === "/signup" && method === "post") {
        responseData = mockDb.signupCustomer(parsedData.name, parsedData.email, parsedData.password, parsedData.address, parsedData.dob);
      } else if (cleanUrl === "/supplier-module/sup-login" && method === "post") {
        responseData = mockDb.loginSupplier(parsedData.email, parsedData.password);
      } else if (cleanUrl === "/supplier-signup" && method === "post") {
        responseData = mockDb.signupSupplier(parsedData.name, parsedData.contact, parsedData.email, parsedData.address, parsedData.category, parsedData.password);
      }
      // 2. Customers
      else if (cleanUrl === "/customers" && method === "get") {
        responseData = mockDb.getCustomers();
      } else if (cleanUrl.startsWith("/customers/") && method === "delete") {
        const id = cleanUrl.split("/")[2];
        responseData = mockDb.deleteCustomer(id);
      }
      // 3. Suppliers
      else if (cleanUrl === "/supplier" && method === "get") {
        responseData = mockDb.getSuppliers();
      } else if (cleanUrl.startsWith("/supplier/") && method === "delete") {
        const id = cleanUrl.split("/")[2];
        responseData = mockDb.deleteSupplier(id);
      }
      // 4. Products
      else if (cleanUrl === "/products" && method === "get") {
        responseData = mockDb.getProducts();
      } else if (cleanUrl === "/products" && method === "post") {
        responseData = mockDb.addProduct(parsedData);
      } else if (cleanUrl.startsWith("/products/type/") && method === "get") {
        const type = cleanUrl.split("/")[3];
        responseData = mockDb.getProducts(type);
      } else if (cleanUrl.startsWith("/products/supplier/") && method === "get") {
        const supId = cleanUrl.split("/")[3];
        responseData = mockDb.getProducts(null, supId);
      } else if (cleanUrl.startsWith("/products/") && method === "get") {
        const id = cleanUrl.split("/")[2];
        responseData = mockDb.getProductById(id);
      } else if (cleanUrl.startsWith("/products/") && method === "put") {
        const id = cleanUrl.split("/")[2];
        responseData = mockDb.updateProduct(id, parsedData);
      } else if (cleanUrl.startsWith("/products/") && method === "delete") {
        const id = cleanUrl.split("/")[2];
        responseData = mockDb.deleteProduct(id);
      }
      // 5. Orders
      else if (cleanUrl === "/orders" && method === "get") {
        const supId = params?.sup_id || (url.includes("sup_id=") ? url.split("sup_id=")[1] : null);
        responseData = mockDb.getOrders(supId);
      } else if (cleanUrl === "/orders" && method === "post") {
        responseData = mockDb.addOrder(parsedData);
      } else if (cleanUrl.startsWith("/orders/") && method === "put") {
        const id = cleanUrl.split("/")[2];
        responseData = mockDb.updateOrderStatus(id, parsedData.status);
      } else if (cleanUrl.startsWith("/orders/") && method === "delete") {
        const id = cleanUrl.split("/")[2];
        responseData = mockDb.deleteOrder(id);
      }
      // 6. Stats & Reports
      else if (cleanUrl === "/dashboard-stats" && method === "get") {
        responseData = mockDb.getDashboardStats();
      } else if (cleanUrl === "/reports" && method === "get") {
        responseData = mockDb.getReports();
      } else if (cleanUrl === "/supplier-reports" && method === "get") {
        const supId = params?.sup_id || (url.includes("sup_id=") ? url.split("sup_id=")[1] : null);
        responseData = mockDb.getSupplierReports(supId);
      }

      if (responseData !== null) {
        resolve({
          data: responseData,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
      } else {
        console.warn(`[Mock API] Unmatched Route: ${method?.toUpperCase()} ${cleanUrl}`);
        reject({
          response: {
            data: { message: `Route not mock-implemented: ${cleanUrl}` },
            status: 404,
            statusText: "Not Found",
            headers: {},
            config
          }
        });
      }
    } catch (err) {
      console.error(`[Mock API] Error handling route:`, err);
      reject({
        response: {
          data: { message: err.message },
          status: 400,
          statusText: "Bad Request",
          headers: {},
          config
        }
      });
    }
  });
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  adapter: isOffline ? offlineAdapter : undefined,
});

export default api;
