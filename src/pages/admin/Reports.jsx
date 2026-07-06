import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Reports = () => {
  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState({
    totalSalesAmount: 0,
    totalOrders: 0,
    productsSummary: [],
    topProducts: []
  });

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reports");
      const data = res.data;

      setReport({
        totalSalesAmount: data.totalSales,
        totalOrders: data.totalOrders,
        productsSummary: Object.entries(data.productsSold || {}).map(([category, obj]) => ({
          category,
          count: obj.totalQuantity
        })),
        topProducts: (data.topProducts || []).map(p => ({
          name: p.name,
          sales: p.sales
        }))
      });
    } catch (err) {
      console.error("❌ Error fetching report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold text-white">📊 Reports</h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-light" role="status"></div>
          <p className="mt-2 text-white">Loading report...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card bg-secondary shadow-lg border-0 text-center p-4 rounded-4">
                <h5>Total Sales Amount</h5>
                <p className="fs-3 fw-bold text-success">
                  ₹{report.totalSalesAmount?.toLocaleString() || 0}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-secondary shadow-lg border-0 text-center p-4 rounded-4">
                <h5>Total Orders</h5>
                <p className="fs-3 fw-bold text-info">
                  {report.totalOrders || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Products Summary */}
          <div className="card bg-secondary shadow-sm border-0 p-3 mb-4 rounded-4 fb-table-wrap">
            <h4 className="mb-3 text-warning p-2">Products by Category</h4>
            <table className="table table-dark table-hover table-striped mb-0">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Number of Items</th>
                </tr>
              </thead>
              <tbody>
                {report.productsSummary?.length > 0 ? (
                  report.productsSummary.map((item, index) => (
                    <tr key={index}>
                      <td>{item.category}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Top Products */}
          <div className="card bg-secondary shadow-sm border-0 p-3 rounded-4 fb-table-wrap">
            <h4 className="mb-3 text-warning p-2">Top Products</h4>
            <table className="table table-dark table-hover table-striped mb-0">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sales Amount</th>
                </tr>
              </thead>
              <tbody>
                {report.topProducts?.length > 0 ? (
                  report.topProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>₹{product.sales.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
