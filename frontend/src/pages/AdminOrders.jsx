
import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0f172a",
      color: "#f8fafc",
      padding: "32px",
      boxSizing: "border-box",
    },
    card: {
      background: "#1e293b",
      border: "1px solid #334155",
      borderRadius: "14px",
      padding: "22px",
      marginBottom: "18px",
    },
    select: {
      background: "#0f172a",
      color: "#f8fafc",
      border: "1px solid #475569",
      borderRadius: "8px",
      padding: "10px",
      marginLeft: "8px",
    },
  };

  const loadOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/admin/orders",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load orders");
      }

      setOrders(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    setError("");
    setMessage("");
    setUpdatingId(orderId);

    try {
      const response = await fetch(
        `http://localhost:5001/api/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order");
      }

      setMessage("Order status updated successfully!");
      await loadOrders();
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div style={styles.page}>
      <div style={{ marginBottom: "28px" }}>
        <p
          style={{
            color: "#38bdf8",
            fontSize: "12px",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          SHOPPY ADMINISTRATION
        </p>

        <h1 style={{ fontSize: "32px", margin: "8px 0" }}>
          Manage Orders
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Review customer purchases and update their delivery status.
        </p>
      </div>

      <div style={styles.card}>
        <p style={{ color: "#94a3b8", margin: 0 }}>Total Orders</p>
        <h2 style={{ fontSize: "30px", marginBottom: 0 }}>
          {orders.length}
        </h2>
      </div>

      {message && (
        <p style={{ color: "#4ade80" }} role="status">
          {message}
        </p>
      )}

      {error && (
        <p style={{ color: "#f87171" }} role="alert">
          {error}
        </p>
      )}

      {orders.length === 0 ? (
        <div style={styles.card}>
          <p style={{ color: "#94a3b8" }}>
            No orders found yet.
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <article key={order._id} style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p style={{ color: "#94a3b8", fontSize: "12px" }}>
                  ORDER ID
                </p>
                <h3 style={{ marginTop: 0, overflowWrap: "anywhere" }}>
                  {order._id}
                </h3>
              </div>

              <div>
                <p style={{ color: "#94a3b8", fontSize: "12px" }}>
                  ORDER TOTAL
                </p>
                <h2 style={{ color: "#38bdf8", marginTop: 0 }}>
                  ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                </h2>
              </div>
            </div>

            <hr style={{ borderColor: "#334155", margin: "20px 0" }} />

            <p>
              <strong>Customer:</strong>{" "}
              {order.customerName || "Customer"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString("en-IN")
                : "N/A"}
            </p>

            <p>
              <strong>Current status:</strong>{" "}
              <span style={{ color: "#38bdf8" }}>
                {order.status || "Placed"}
              </span>
            </p>

            <div style={{ marginTop: "20px" }}>
              <label>
                <strong>Update status:</strong>

                <select
                  style={styles.select}
                  value={order.status || "Placed"}
                  disabled={updatingId === order._id}
                  onChange={(event) =>
                    updateStatus(order._id, event.target.value)
                  }
                >
                  <option value="Placed">Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>

              {updatingId === order._id && (
                <span style={{ color: "#94a3b8", marginLeft: "10px" }}>
                  Updating...
                </span>
              )}
            </div>

            {order.items?.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <h4>Items in this order</h4>

                {order.items.map((item, index) => (
                  <div
                    key={item._id || index}
                    style={{
                      background: "#0f172a",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <span>
                      {item.name || item.productName || "Product"}
                    </span>
                    <span style={{ color: "#94a3b8" }}>
                      {" "}— Quantity: {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))
      )}
    </div>
  );
}

export default AdminOrders;
