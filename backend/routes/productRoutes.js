const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// Get one product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});

// Create product
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;

    if (
      !name ||
      price === undefined ||
      !image ||
      !description ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: "All product fields are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
});

module.exports = router;