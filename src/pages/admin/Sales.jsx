import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // fetch orders
  useEffect(() => {
    api.get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("❌ Error fetching orders:", err));
  }, []);

  // delete order
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/orders/${id}`);
      setOrders(orders.filter((o) => o._id !== id));
    } catch (err) {
      console.error("❌ Error deleting order:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-white">Orders Management</h2>

      <div className="table-responsive fb-table-wrap">
        <table className="table table-dark table-striped table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Total (₹)</th>
              <th>Status</th>
              <th>Date</th>
              <th>Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id || order.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div><strong>{order.customer.name}</strong></div>
                    <div className="small text-muted">{order.customer.email}</div>
                  </td>
                  <td>₹{order.total}</td>
                  <td>
                    <span className={`badge ${order.status === "Delivered" ? "bg-success" : order.status === "Processing" ? "bg-info" : "bg-warning"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>
                    <ul className="list-unstyled m-0">
                      {order.items.map((item, i) => (
                        <li key={i} className="small">
                          {item.product_name} (x{item.count})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(order._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
