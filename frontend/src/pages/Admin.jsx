
import { useEffect, useState } from "react";

function Admin() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/admin/dashboard", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        return data;
      })
      .then((data) => setDashboard(data))
      .catch((error) => setError(error.message));
  }, []);

  const pageStyle = {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#f8fafc",
    padding: "32px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "#1e293b",
    padding: "24px",
    borderRadius: "14px",
    border: "1px solid #334155",
  };

  if (error) {
    return (
      <div style={pageStyle}>
        <h1>Admin Dashboard</h1>
        <p style={{ color: "#f87171" }}>Error: {error}</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div style={pageStyle}>
        <h1>Admin Dashboard</h1>
        <p style={{ color: "#94a3b8" }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ marginBottom: "32px" }}>
        <p
          style={{
            color: "#38bdf8",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          SHOPPY ADMINISTRATION
        </p>

        <h1 style={{ fontSize: "32px", margin: "8px 0" }}>
          Dashboard Overview
        </h1>

        <p style={{ color: "#94a3b8", margin: 0 }}>
          Welcome to your Shoppy store management panel.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <p style={{ color: "#94a3b8", margin: "0 0 12px" }}>
            Total Products
          </p>
          <h2 style={{ fontSize: "32px", margin: 0 }}>
            {dashboard.totalProducts ?? 0}
          </h2>
          <p style={{ color: "#38bdf8", marginBottom: 0 }}>
            Products in your store
          </p>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#94a3b8", margin: "0 0 12px" }}>
            Total Orders
          </p>
          <h2 style={{ fontSize: "32px", margin: 0 }}>
            {dashboard.totalOrders ?? 0}
          </h2>
          <p style={{ color: "#38bdf8", marginBottom: 0 }}>
            Customer orders
          </p>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#94a3b8", margin: "0 0 12px" }}>
            Total Sales
          </p>
          <h2 style={{ fontSize: "32px", margin: 0 }}>
            ₹{Number(dashboard.totalSales ?? 0).toLocaleString("en-IN")}
          </h2>
          <p style={{ color: "#38bdf8", marginBottom: 0 }}>
            Sales summary
          </p>
        </div>
      </div>

      <div
        style={{
          ...cardStyle,
          marginTop: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Store Management</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
          Use the navigation above to add products, update existing products,
          review customer orders, and manage order statuses.
        </p>
      </div>
    </div>
  );
}

export default Admin;
