
import { useEffect, useState } from "react";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  };

  const [form, setForm] = useState({ ...emptyForm });

  const token = () => localStorage.getItem("token");

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
      padding: "24px",
      marginBottom: "24px",
    },
    input: {
      width: "100%",
      padding: "12px",
      boxSizing: "border-box",
      background: "#0f172a",
      color: "#f8fafc",
      border: "1px solid #475569",
      borderRadius: "8px",
      fontSize: "14px",
    },
    primaryButton: {
      background: "#38bdf8",
      color: "#0f172a",
      border: "none",
      borderRadius: "8px",
      padding: "11px 18px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    secondaryButton: {
      background: "#334155",
      color: "#f8fafc",
      border: "1px solid #475569",
      borderRadius: "8px",
      padding: "10px 16px",
      cursor: "pointer",
    },
  };

  const loadProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/admin/products",
        {
          headers: { Authorization: "Bearer " + token() },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load products");
      }

      setProducts(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const isEditing = Boolean(editingId);
    const url = isEditing
      ? `http://localhost:5001/api/admin/products/${editingId}`
      : "http://localhost:5001/api/admin/products";

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token(),
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save product");
      }

      setMessage(
        isEditing
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      setForm({ ...emptyForm });
      setEditingId(null);
      await loadProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      price: String(product.price ?? ""),
      image: product.image || "",
      description: product.description || "",
      category: product.category || "",
      stock: String(product.stock ?? ""),
    });

    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setMessage("");
    setError("");
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5001/api/admin/products/${product._id}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token() },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      if (editingId === product._id) {
        setEditingId(null);
        setForm({ ...emptyForm });
      }

      setMessage("Product deleted successfully!");
      await loadProducts();
    } catch (error) {
      setError(error.message);
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
          Manage Products
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Add products, update details, and manage your store inventory.
        </p>
      </div>

      <section style={styles.card}>
        <h2 style={{ marginTop: 0 }}>
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <label>
              Product Name
              <input
                style={styles.input}
                name="name"
                placeholder="e.g. Wireless Headphones"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Price (₹)
              <input
                style={styles.input}
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="1999"
                value={form.price}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Image Path or URL
              <input
                style={styles.input}
                name="image"
                placeholder="/images/headphones.jpg"
                value={form.image}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Category
              <input
                style={styles.input}
                name="category"
                placeholder="Electronics"
                value={form.category}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Stock Quantity
              <input
                style={styles.input}
                name="stock"
                type="number"
                min="0"
                step="1"
                placeholder="10"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label style={{ display: "block", marginTop: "18px" }}>
            Description
            <textarea
              style={{
                ...styles.input,
                minHeight: "100px",
                resize: "vertical",
              }}
              name="description"
              placeholder="Describe the product..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button type="submit" style={styles.primaryButton}>
              {editingId ? "Save Changes" : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={handleCancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <h2>Existing Products</h2>
        <span style={{ color: "#94a3b8" }}>
          {products.length} product{products.length === 1 ? "" : "s"}
        </span>
      </div>

      {products.length === 0 ? (
        <div style={styles.card}>
          <p style={{ color: "#94a3b8" }}>No products found.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "18px",
          }}
        >
          {products.map((product) => (
            <article
              key={product._id}
              style={{
                ...styles.card,
                marginBottom: 0,
              }}
            >
              <h3 style={{ marginTop: 0 }}>{product.name}</h3>

              <p style={{ color: "#38bdf8", fontSize: "20px" }}>
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>

              <p style={{ color: "#cbd5e1" }}>
                Category: {product.category}
              </p>

              <p style={{ color: "#94a3b8" }}>
                Stock: {product.stock}
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                <button
                  type="button"
                  style={styles.primaryButton}
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  style={{
                    ...styles.secondaryButton,
                    color: "#fca5a5",
                  }}
                  onClick={() => handleDelete(product)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
