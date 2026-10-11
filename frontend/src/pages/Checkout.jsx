
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Check login token
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    let cart;

    try {
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      setError("Your cart could not be read. Please review your cart.");
      return;
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      setError("Your cart is empty. Please add a product before checkout.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const orderData = {
      fullName: formData.get("fullName").trim(),
      email: formData.get("email").trim(),
      phone: formData.get("phone").trim(),
      address: formData.get("address").trim(),
      items: cart.map((item) => ({
        productId: item._id || item.productId || item.id,
        quantity: Number(item.quantity || 1),
      })),
    };

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to place your order."
        );
      }

      // Clear the cart only after the order is saved.
      localStorage.removeItem("cart");

      navigate("/order-confirmation", {
        state: { order: result.order },
      });
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <p className="checkout-small">CHECKOUT</p>
        <h1>Complete Your Order</h1>
        <p>Enter your details to place your order.</p>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            autoComplete="tel"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your delivery address"
            autoComplete="street-address"
            rows="4"
            required
          />
        </div>

        {error && (
          <p role="alert" className="checkout-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="place-order-button"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        <p>
          Need to review your items?{" "}
          <Link to="/cart">Return to Cart</Link>
        </p>
      </form>
    </section>
  );
}

export default Checkout;