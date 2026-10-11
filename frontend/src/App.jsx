
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";

import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Existing Shoppy pages */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />
        <Route path="/orders" element={<Orders />} />

        {/* Admin pages */}
        <Route
          path="/admin"
          element={
            <>
              <AdminNavbar />
              <Admin />
            </>
          }
        />

        <Route
          path="/admin/products"
          element={
            <>
              <AdminNavbar />
              <AdminProducts />
            </>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <>
              <AdminNavbar />
              <AdminOrders />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
