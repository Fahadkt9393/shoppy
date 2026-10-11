import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="shop-page">
        <div className="shop-header">
          <p className="shop-small">SHOPPY COLLECTION</p>
          <h1>Shop Our Products</h1>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="shop-page">
        <div className="shop-header">
          <p className="shop-small">SHOPPY COLLECTION</p>
          <h1>Shop Our Products</h1>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-page">
      <div className="shop-header">
        <p className="shop-small">SHOPPY COLLECTION</p>

        <h1>Shop Our Products</h1>

        <p>
          Explore our collection of quality products at great prices.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
            />

            <div className="product-info">
              <h2>{product.name}</h2>

              <p className="product-price">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <p>{product.description}</p>

              <Link to={`/product/${product._id}`}>
                <button>View Product</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Shop;