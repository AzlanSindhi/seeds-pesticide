import React, { useEffect, useState } from "react";
import api from "../../services/api";

const SupplierReports = () => {
  const [report, setReport] = useState({
    totalSalesAmount: 0,
    totalOrders: 0,
    productsSummary: [],
    topProducts: []
  });
  const [loading, setLoading] = useState(true);

  const supplier = JSON.parse(localStorage.getItem("supplier"));

  useEffect(() => {
    if (!supplier) {
      console.warn("⚠️ No supplier found in localStorage, not fetching reports");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        const res = await api.get(`/supplier-reports?sup_id=${supplier.sup_id}`);
        setReport(res.data);
      } catch (err) {
        console.error("❌ Error fetching supplier report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [supplier]);

  if (loading) {
    return <p className="text-center mt-5">⏳ Loading supplier report...</p>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 pt-2 text-dark text-center fw-bold">📊 Supplier Reports</h2>

      {supplier && (
        <div className="alert alert-primary fw-bold text-center border-0 mb-4" style={{ borderRadius: "8px" }}>
          Viewing reports for: {supplier.supplier_name} (ID: {supplier.sup_id})
        </div>
      )}

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card text-center p-3 shadow-sm border-0 bg-white" style={{ borderRadius: "10px" }}>
            <h5>Total Sales Amount</h5>
            <p className="fs-4 fw-bold text-success mb-0">₹{report.totalSalesAmount?.toLocaleString() || 0}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center p-3 shadow-sm border-0 bg-white" style={{ borderRadius: "10px" }}>
            <h5>Total Orders</h5>
            <p className="fs-4 fw-bold text-primary mb-0">{report.totalOrders || 0}</p>
          </div>
        </div>
      </div>

      {/* Products Summary */}
      <div className="fb-table-wrap mb-4 bg-white p-3 shadow-sm" style={{ borderRadius: "10px" }}>
        <h4 className="mb-3 text-success fw-bold p-2">Products by Category</h4>
        <table className="table table-hover table-striped mb-0 text-center">
          <thead className="table-success text-success">
            <tr>
              <th>Category</th>
              <th>Number of Items Sold</th>
            </tr>
          </thead>
          <tbody>
            {report.productsSummary && report.productsSummary.length > 0 ? (
              report.productsSummary.map((item, i) => (
                <tr key={i}>
                  <td>{item.category}</td>
                  <td>{item.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center text-muted">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Top Products */}
      <div className="fb-table-wrap bg-white p-3 shadow-sm" style={{ borderRadius: "10px" }}>
        <h4 className="mb-3 text-success fw-bold p-2">Top Products</h4>
        <table className="table table-hover table-striped mb-0 text-center">
          <thead className="table-success text-success">
            <tr>
              <th>Product</th>
              <th>Sales Amount</th>
            </tr>
          </thead>
          <tbody>
            {report.topProducts && report.topProducts.length > 0 ? (
              report.topProducts.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td className="text-success fw-bold">₹{p.sales?.toLocaleString() || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center text-muted">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierReports;
