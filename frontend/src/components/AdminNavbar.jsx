
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "16px 24px",
        background: "#1e293b",
        flexWrap: "wrap",
      }}
    >
      <Link style={{ color: "white" }} to="/admin">
        Dashboard
      </Link>

      <Link style={{ color: "white" }} to="/admin/products">
        Manage Products
      </Link>

      <Link style={{ color: "white" }} to="/admin/orders">
        Manage Orders
      </Link>
    </nav>
  );
}

export default AdminNavbar;
