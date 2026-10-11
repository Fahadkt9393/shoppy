import { Link } from "react-router-dom";
import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        const newQuantity = Math.max(
          1,
          Math.min(item.stock, item.quantity + change)
        );

        return {
          ...item,
          quantity: newQuantity,
        };
      }

      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeProduct = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getPrice = (price) => {
    return Number(price);
  };

  const total = cart.reduce((sum, item) => {
    return sum + getPrice(item.price) * item.quantity;
  }, 0);

  return (
    <section className="cart-page">
      <div className="cart-header">
        <p className="cart-small">YOUR CART</p>

        <h1>Shopping Cart</h1>

        <p>
          Review your products before completing your order.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>

          <p>
            Add some products to your cart to see them here.
          </p>

          <Link to="/shop">
            <button>Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              className="cart-item"
              key={item._id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-info">
                <h2>{item.name}</h2>

                <p className="cart-price">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                <p>{item.description}</p>

                <p>
                  <strong>Stock:</strong> {item.stock}
                </p>

                <div className="cart-actions">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, -1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, 1)
                    }
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <p className="cart-total">
                  Item Total: ₹
                  {(
                    getPrice(item.price) *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </p>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeProduct(item._id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>
              Cart Total: ₹
              {total.toLocaleString("en-IN")}
            </h2>

            <Link to="/checkout">
              <button className="checkout-button">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;