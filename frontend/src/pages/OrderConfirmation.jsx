import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <section className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>

        <p className="confirmation-small">ORDER CONFIRMED</p>

        <h1>Thank You for Your Order!</h1>

        <p>
          Your order has been successfully placed.
          We appreciate your purchase.
        </p>

        <Link to="/shop">
          <button className="confirmation-button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </section>
  );
}

export default OrderConfirmation;