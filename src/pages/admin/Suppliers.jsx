import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  // Fetch supplier data
  useEffect(() => {
    api.get("/supplier")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("❌ Error fetching suppliers:", err));
  }, []);

  // Delete supplier
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      await api.delete(`/supplier/${id}`);
      setSuppliers(suppliers.filter((s) => s._id !== id));
    } catch (err) {
      console.error("❌ Error deleting supplier:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-white">Supplier Management</h2>

      <div className="table-responsive fb-table-wrap">
        <table className="table table-dark table-striped table-hover align-middle mb-0">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Supplier ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Products Supplied</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((sup, index) => (
                <tr key={sup._id || sup.sup_id}>
                  <td className="text-center fw-bold">{index + 1}</td>
                  <td className="fw-semibold">{sup.sup_id}</td>
                  <td>{sup.name}</td>
                  <td>{sup.contact}</td>
                  <td>{sup.email}</td>
                  <td>{sup.address}</td>
                  <td>
                    {Array.isArray(sup.products_supplied) && sup.products_supplied.length > 0
                      ? sup.products_supplied.join(", ")
                      : "None"}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(sup._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-3">
                  No suppliers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Supplier;
