const defaultProducts = [
  {
    _id: "prod_001",
    id: "PROD001",
    product_name: "Premium Hybrid Tomato Seeds",
    type: "Seeds",
    quantity: "500g",
    price: 350,
    description: "High-yield disease-resistant hybrid tomato seeds suitable for all seasons.",
    how_to_use: "Sow in well-drained nursery beds at 0.5cm depth. Transplant seedlings after 25 days.",
    benefits: ["Disease resistant", "High fruit setting", "Uniform size and deep red color"],
    supplier_id: "SUP001",
    status: "In Stock",
    stocks: 120,
    url: "https://images.unsplash.com/photo-1592841208221-a5808df73648?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "prod_002",
    id: "PROD002",
    product_name: "Organic Sweet Corn Seeds",
    type: "Seeds",
    quantity: "1kg",
    price: 480,
    description: "Sweet, juicy and tender organic corn seeds optimized for tropical climates.",
    how_to_use: "Sow directly in soil with 30cm spacing. Keep soil moist and plant in full sunlight.",
    benefits: ["100% Organic", "Excellent sweetness", "Sturdy lodging-resistant stalks"],
    supplier_id: "SUP001",
    status: "In Stock",
    stocks: 85,
    url: "https://images.unsplash.com/photo-1551754625-70c904875f57?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "prod_003",
    id: "PROD003",
    product_name: "Neem Oil Pest Spray",
    type: "Pesticides",
    quantity: "1L",
    price: 299,
    description: "Natural cold-pressed neem oil water-soluble concentrate for organic pest protection.",
    how_to_use: "Mix 15ml of neem oil in 1L of water. Spray thoroughly on foliage every 10-14 days.",
    benefits: ["Eco-friendly and non-toxic", "Repels over 200 insects", "Safe for beneficial insects"],
    supplier_id: "SUP002",
    status: "In Stock",
    stocks: 6, // Trigger low stock
    url: "https://images.unsplash.com/photo-1599933333946-b379373de319?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "prod_004",
    id: "PROD004",
    product_name: "Fungal Guard Bio-Fungicide",
    type: "Pesticides",
    quantity: "500ml",
    price: 320,
    description: "Broad-spectrum organic bio-fungicide to control blight, mildew and root rot.",
    how_to_use: "Dilute 5ml per Liter of water. Apply as foliar spray or soil drench.",
    benefits: ["Controls soil-borne pathogens", "Enhances plant immunity", "No residue post-harvest"],
    supplier_id: "SUP002",
    status: "In Stock",
    stocks: 45,
    url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400"
  }
];

const defaultCustomers = [
  {
    _id: "cust_001",
    id: "CUS001",
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    address: "Village Rampur, Punjab",
    dob: "1985-05-15"
  }
];

const defaultCustMaster = [
  {
    cust_id: "CUS001",
    cust_name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    password: "password"
  }
];

const defaultSuppliers = [
  {
    _id: "sup_row_001",
    sup_id: "SUP001",
    name: "Green Growers Co.",
    contact: "9876543210",
    email: "growers@gmail.com",
    address: "Ludhiana, Punjab",
    category: "Seeds",
    products_supplied: ["Premium Hybrid Tomato Seeds", "Organic Sweet Corn Seeds"]
  },
  {
    _id: "sup_row_002",
    sup_id: "SUP002",
    name: "EcoAgro Protection",
    contact: "9123456789",
    email: "ecoagro@gmail.com",
    address: "Nashik, Maharashtra",
    category: "Pesticides",
    products_supplied: ["Neem Oil Pest Spray", "Fungal Guard Bio-Fungicide"]
  }
];

const defaultSupMaster = [
  {
    sup_id: "SUP001",
    supplier_name: "Green Growers Co.",
    email: "growers@gmail.com",
    password: "password"
  },
  {
    sup_id: "SUP002",
    supplier_name: "EcoAgro Protection",
    email: "ecoagro@gmail.com",
    password: "password"
  }
];

const defaultOrders = [
  {
    _id: "order_001",
    order_id: "ORD001",
    customer: {
      name: "Ramesh Kumar",
      email: "ramesh@gmail.com",
      phone: "9876543210",
      address: "Village Rampur, Punjab",
      payment: "COD"
    },
    items: [
      { _id: "prod_001", product_name: "Premium Hybrid Tomato Seeds", price: 350, count: 2 }
    ],
    total: 700,
    date: new Date("2025-05-10T10:00:00Z").toISOString(),
    status: "Delivered",
    sup_id: "SUP001"
  },
  {
    _id: "order_002",
    order_id: "ORD002",
    customer: {
      name: "Ramesh Kumar",
      email: "ramesh@gmail.com",
      phone: "9876543210",
      address: "Village Rampur, Punjab",
      payment: "COD"
    },
    items: [
      { _id: "prod_003", product_name: "Neem Oil Pest Spray", price: 299, count: 1 }
    ],
    total: 299,
    date: new Date().toISOString(),
    status: "Pending",
    sup_id: "SUP002"
  }
];

// Helper to get or initialize localStorage item
const getStorageItem = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(data);
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const initializeMockDb = () => {
  getStorageItem("fb_products", defaultProducts);
  getStorageItem("fb_customers", defaultCustomers);
  getStorageItem("fb_cust_master", defaultCustMaster);
  getStorageItem("fb_suppliers", defaultSuppliers);
  getStorageItem("fb_supplier_master", defaultSupMaster);
  getStorageItem("fb_orders", defaultOrders);
  console.log("🌱 LocalStorage Mock DB initialized!");
};

// Database handlers
export const mockDb = {
  // --- AUTH ENTITIES ---
  signupCustomer: (name, email, password, address, dob) => {
    const custMaster = getStorageItem("fb_cust_master", defaultCustMaster);
    if (custMaster.find((c) => c.email === email)) {
      throw new Error("❌ Email already registered");
    }

    const customers = getStorageItem("fb_customers", defaultCustomers);
    const count = custMaster.length;
    const cust_id = `CUS${(count + 1).toString().padStart(3, "0")}`;

    custMaster.push({ cust_id, cust_name: name, email, password });
    customers.push({ id: cust_id, name, email, address, dob });

    setStorageItem("fb_cust_master", custMaster);
    setStorageItem("fb_customers", customers);

    return { cust_id };
  },

  loginCustomer: (email, password) => {
    const custMaster = getStorageItem("fb_cust_master", defaultCustMaster);
    const user = custMaster.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");
    return { cust_name: user.cust_name, email: user.email };
  },

  loginSupplier: (email, password) => {
    const supMaster = getStorageItem("fb_supplier_master", defaultSupMaster);
    const supplier = supMaster.find((s) => s.email === email && s.password === password);
    if (!supplier) throw new Error("❌ Invalid Email or Password");
    return {
      sup_id: supplier.sup_id,
      supplier_name: supplier.supplier_name,
      email: supplier.email
    };
  },

  signupSupplier: (name, contact, email, address, category, password) => {
    const supMaster = getStorageItem("fb_supplier_master", defaultSupMaster);
    if (supMaster.find((s) => s.email === email)) {
      throw new Error("❌ Email already registered");
    }

    const suppliers = getStorageItem("fb_suppliers", defaultSuppliers);
    const count = supMaster.length;
    const sup_id = `SUP${(count + 1).toString().padStart(3, "0")}`;

    suppliers.push({ sup_id, name, contact, email, address, category, products_supplied: [] });
    supMaster.push({ sup_id, supplier_name: name, email, password });

    setStorageItem("fb_suppliers", suppliers);
    setStorageItem("fb_supplier_master", supMaster);

    return { sup_id };
  },

  // --- PRODUCTS ---
  getProducts: (type, supplier_id) => {
    let products = getStorageItem("fb_products", defaultProducts);
    if (type) {
      products = products.filter((p) => p.type?.toLowerCase() === type.toLowerCase());
    }
    if (supplier_id) {
      products = products.filter((p) => p.supplier_id === supplier_id);
    }
    return products;
  },

  getProductById: (id) => {
    const products = getStorageItem("fb_products", defaultProducts);
    const product = products.find((p) => p._id === id || p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  addProduct: (productData) => {
    const products = getStorageItem("fb_products", defaultProducts);
    const _id = "prod_" + Date.now();
    const id = "PROD" + (products.length + 1).toString().padStart(3, "0");

    const newProd = { ...productData, _id, id };
    products.push(newProd);
    setStorageItem("fb_products", products);

    // Also update products_supplied inside supplier database
    const suppliers = getStorageItem("fb_suppliers", defaultSuppliers);
    const supplierIndex = suppliers.findIndex((s) => s.sup_id === productData.supplier_id);
    if (supplierIndex !== -1) {
      if (!suppliers[supplierIndex].products_supplied.includes(productData.product_name)) {
        suppliers[supplierIndex].products_supplied.push(productData.product_name);
        setStorageItem("fb_suppliers", suppliers);
      }
    }

    return newProd;
  },

  updateProduct: (id, productData) => {
    const products = getStorageItem("fb_products", defaultProducts);
    const idx = products.findIndex((p) => p._id === id || p.id === id);
    if (idx === -1) throw new Error("Product not found");

    products[idx] = { ...products[idx], ...productData };
    setStorageItem("fb_products", products);
    return products[idx];
  },

  deleteProduct: (id) => {
    const products = getStorageItem("fb_products", defaultProducts);
    const filtered = products.filter((p) => p._id !== id && p.id !== id);
    setStorageItem("fb_products", filtered);
    return { message: "Product deleted" };
  },

  // --- CUSTOMERS ---
  getCustomers: () => {
    return getStorageItem("fb_customers", defaultCustomers);
  },

  deleteCustomer: (id) => {
    const customers = getStorageItem("fb_customers", defaultCustomers);
    const filtered = customers.filter((c) => c._id !== id && c.id !== id);
    setStorageItem("fb_customers", filtered);
    return { message: "Customer deleted" };
  },

  // --- SUPPLIERS ---
  getSuppliers: () => {
    return getStorageItem("fb_suppliers", defaultSuppliers);
  },

  deleteSupplier: (id) => {
    const suppliers = getStorageItem("fb_suppliers", defaultSuppliers);
    const filtered = suppliers.filter((s) => s._id !== id && s.sup_id !== id);
    setStorageItem("fb_suppliers", filtered);
    return { message: "Supplier deleted" };
  },

  // --- ORDERS ---
  getOrders: (sup_id) => {
    let orders = getStorageItem("fb_orders", defaultOrders);
    if (sup_id) {
      orders = orders.filter((o) => o.sup_id === sup_id || o.items.some((item) => {
        // Fallback checks if order contains supplier items
        const products = getStorageItem("fb_products", defaultProducts);
        const prod = products.find((p) => p.product_name === item.product_name);
        return prod && prod.supplier_id === sup_id;
      }));
    }
    return orders;
  },

  addOrder: (orderData) => {
    const orders = getStorageItem("fb_orders", defaultOrders);
    const _id = "order_" + Date.now();
    const order_id = "ORD" + (orders.length + 1).toString().padStart(3, "0");

    // Deduce supplier ID from the first product
    let deducedSupId = "SUP001";
    if (orderData.items && orderData.items.length > 0) {
      const products = getStorageItem("fb_products", defaultProducts);
      const matchedProduct = products.find((p) => p.product_name === orderData.items[0].product_name);
      if (matchedProduct) {
        deducedSupId = matchedProduct.supplier_id;
      }
    }

    const newOrder = {
      ...orderData,
      _id,
      order_id,
      status: "Pending",
      sup_id: deducedSupId
    };
    orders.push(newOrder);
    setStorageItem("fb_orders", orders);

    // Update stocks count for products
    const products = getStorageItem("fb_products", defaultProducts);
    orderData.items.forEach((item) => {
      const idx = products.findIndex((p) => p.product_name === item.product_name);
      if (idx !== -1) {
        products[idx].stocks = Math.max(0, products[idx].stocks - item.count);
      }
    });
    setStorageItem("fb_products", products);

    return newOrder;
  },

  updateOrderStatus: (id, status) => {
    const orders = getStorageItem("fb_orders", defaultOrders);
    const idx = orders.findIndex((o) => o._id === id || o.order_id === id);
    if (idx === -1) throw new Error("Order not found");

    orders[idx].status = status;
    setStorageItem("fb_orders", orders);
    return orders[idx];
  },

  deleteOrder: (id) => {
    const orders = getStorageItem("fb_orders", defaultOrders);
    const filtered = orders.filter((o) => o._id !== id && o.order_id !== id);
    setStorageItem("fb_orders", filtered);
    return { message: "Order deleted successfully" };
  },

  // --- STATS & REPORTS ---
  getDashboardStats: () => {
    const customers = getStorageItem("fb_customers", defaultCustomers);
    const suppliers = getStorageItem("fb_suppliers", defaultSuppliers);
    const products = getStorageItem("fb_products", defaultProducts);
    const orders = getStorageItem("fb_orders", defaultOrders);

    const totalSalesAmount = orders.reduce((sum, o) => sum + o.total, 0);

    return {
      customers: customers.length,
      suppliers: suppliers.length,
      products: products.length,
      sales: orders.length,
      totalSalesAmount,
      reports: 9
    };
  },

  getReports: () => {
    const orders = getStorageItem("fb_orders", defaultOrders);
    const products = getStorageItem("fb_products", defaultProducts);

    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;

    const productsSold = {};
    for (let order of orders) {
      for (let item of order.items) {
        const prod = products.find((p) => p.product_name === item.product_name);
        const cat = prod?.type || "Unknown";
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
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, sales]) => ({ name, sales }));

    return {
      totalSales,
      totalOrders,
      productsSold,
      topProducts
    };
  },

  getSupplierReports: (sup_id) => {
    const orders = getStorageItem("fb_orders", defaultOrders);
    const products = getStorageItem("fb_products", defaultProducts);

    let totalSales = 0;
    let totalOrders = 0;
    const productsSold = {};
    const productMap = {};

    for (let order of orders) {
      let supplierOrder = false;

      for (let item of order.items) {
        const prod = products.find((p) => p.product_name === item.product_name);
        if (!prod || prod.supplier_id !== sup_id) continue;

        supplierOrder = true;
        const cat = prod.type || "Unknown";
        if (!productsSold[cat]) productsSold[cat] = { totalQuantity: 0 };
        productsSold[cat].totalQuantity += item.count;

        if (!productMap[item.product_name]) productMap[item.product_name] = 0;
        productMap[item.product_name] += item.price * item.count;

        totalSales += item.price * item.count;
      }

      if (supplierOrder) {
        totalOrders += 1;
      }
    }

    const topProducts = Object.entries(productMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, sales]) => ({ name, sales }));

    return {
      totalSalesAmount: totalSales,
      totalOrders,
      productsSummary: Object.entries(productsSold).map(([category, obj]) => ({
        category,
        count: obj.totalQuantity
      })),
      topProducts
    };
  }
};
