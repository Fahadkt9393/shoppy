import { Link } from "react-router-dom";
import products from "../data/products";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO SHOPPY</p>

          <h1>
            Shop Smart.
            <br />
            Live Better.
          </h1>

          <p className="hero-description">
            Discover quality products, great prices, and everything you need
            in one place.
          </p>

          <Link to="/shop" className="shop-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-header">
          <p className="featured-small">FEATURED PRODUCTS</p>

          <h2>Popular Picks</h2>

          <p>
            Explore some of our popular products selected for you.
          </p>
        </div>

        <div className="featured-grid">
          <div className="featured-card">
            <img
              src={products[0].image}
              alt={products[0].name}
            />

            <h3>{products[0].name}</h3>

            <p>{products[0].price}</p>

            <Link to={`/product/${products[0].id}`}>
              View Product
            </Link>
          </div>

          <div className="featured-card">
            <img
              src={products[1].image}
              alt={products[1].name}
            />

            <h3>{products[1].name}</h3>

            <p>{products[1].price}</p>

            <Link to={`/product/${products[1].id}`}>
              View Product
            </Link>
          </div>

          <div className="featured-card">
            <img
              src={products[2].image}
              alt={products[2].name}
            />

            <h3>{products[2].name}</h3>

            <p>{products[2].price}</p>

            <Link to={`/product/${products[2].id}`}>
              View Product
            </Link>
          </div>
        </div>

        <div className="featured-button">
          <Link to="/shop">View All Products</Link>
        </div>
      </section>
    </>
  );
}

export default Home;