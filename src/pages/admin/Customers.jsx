import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    api.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("❌ Error fetching customers:", err));
  }, []);

  // Delete handler
  const handleRemove = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter((c) => c._id !== id)); // update UI
    } catch (err) {
      console.error("❌ Error deleting customer:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-white">Customer Management</h2>

      <div className="table-responsive fb-table-wrap">
        <table className="table table-dark table-striped table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((cust, index) => (
                <tr key={cust._id || cust.id}>
                  <td>{index + 1}</td>
                  <td>{cust.name}</td>
                  <td>{cust.email}</td>
                  <td>{cust.address}</td>
                  <td>{cust.dob}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(cust._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
