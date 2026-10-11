import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
          return;
        }

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Could not load orders.");
        }

        setOrders(data.orders);
      } catch (err) {
        setError(err.message || "Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <section className="orders-page">
        <p>Loading orders...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="orders-page">
        <p className="orders-error">{error}</p>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <div className="orders-header">
        <p className="orders-eyebrow">YOUR SHOPPY ACCOUNT</p>
        <h1>My Orders</h1>
        <p>Track your purchases and view your order details.</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders yet</h2>
          <p>Your purchases will appear here when you place an order.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order._id}>
              <div className="order-card-header">
                <div>
                  <p className="order-label">ORDER ID</p>
                  <p className="order-id">{order._id}</p>
                </div>

                <span className="order-status">
                  {order.status || "Placed"}
                </span>
              </div>

              <div className="order-date">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div
                    className="order-item"
                    key={item.productId + "-" + index}
                  >
                    <div className="order-item-image">
                      {item.image && (
                        <img
                         src={
  item.image.startsWith("http")
    ? item.image
    : item.image.startsWith("/")
      ? item.image
      : `/${item.image}`
}
                          alt={item.name}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                    </div>

                    <div className="order-item-info">
                      <h3>{item.name}</h3>
                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <p className="order-item-price">
                      ₹
                      {Number(item.lineTotal || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span>Total Amount</span>
                <strong>
                  ₹
                  {Number(order.totalAmount || 0).toLocaleString("en-IN")}
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Orders;