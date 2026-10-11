import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));

    const existingCart = Array.isArray(savedCart)
      ? savedCart
      : [];

    const existingProduct = existingCart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      existingCart.push({
        ...product,
        quantity,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    navigate("/cart");
  };

  if (loading) {
    return (
      <section className="product-details">
        <h1>Loading product...</h1>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="product-details">
        <h1>Product Not Found</h1>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="product-details">
      <div className="product-details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-details-info">
        <p className="product-small">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <h2>
          ₹{product.price.toLocaleString("en-IN")}
        </h2>

        <p>{product.description}</p>

        <p>
          <strong>Stock:</strong> {product.stock} available
        </p>

        <div className="product-quantity">
          <button
            onClick={() =>
              setQuantity((current) =>
                Math.max(1, current - 1)
              )
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity((current) =>
                Math.min(product.stock, current + 1)
              )
            }
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0
            ? "Out of Stock"
            : "Add to Cart"}
        </button>
      </div>
    </section>
  );
}

export default ProductDetails;