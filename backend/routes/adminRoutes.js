const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const Product = require("../models/product");
const Order = require("../models/order");

const router = express.Router();

// Protect every admin route
router.use(authMiddleware, adminMiddleware);

// Admin dashboard summary
router.get("/dashboard", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const salesResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("customer totalAmount status createdAt");

    res.json({
      totalProducts,
      totalOrders,
      totalSales: salesResult[0]?.totalSales || 0,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load admin dashboard.",
    });
  }
});

// View all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products.",
    });
  }
});

// Create a product
router.post("/products", async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;

    if (
      !name?.trim() ||
      price === undefined ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      !image?.trim() ||
      !description?.trim() ||
      !category?.trim() ||
      stock === undefined ||
      !Number.isSafeInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      return res.status(400).json({
        message: "Please provide valid product details.",
      });
    }

    const product = await Product.create({
      name: name.trim(),
      price: Number(price),
      image: image.trim(),
      description: description.trim(),
      category: category.trim(),
      stock: Number(stock),
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product.",
    });
  }
});

// Update a product
router.put("/products/:id", async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;

    if (
      !name?.trim() ||
      price === undefined ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      !image?.trim() ||
      !description?.trim() ||
      !category?.trim() ||
      stock === undefined ||
      !Number.isSafeInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      return res.status(400).json({
        message: "Please provide valid product details.",
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price: Number(price),
        image: image.trim(),
        description: description.trim(),
        category: category.trim(),
        stock: Number(stock),
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update product.",
    });
  }
});

// Delete a product
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete product.",
    });
  }
});

// View all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders.",
    });
  }
});

// Update an order's status
router.patch("/orders/:id/status", async (req, res) => {
  try {
   const allowedStatuses = [
  "Placed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json({
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update order status.",
    });
  }
});

module.exports = router;