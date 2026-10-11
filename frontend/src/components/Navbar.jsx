import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Shoppy
      </Link>

      
<div className="nav-links">
  <Link to="/">Home</Link>
  <Link to="/shop">Shop</Link>
  <Link to="/cart">Cart</Link>
  <Link to="/orders">Orders</Link>

        {isLoggedIn ? (
          <>
            

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;