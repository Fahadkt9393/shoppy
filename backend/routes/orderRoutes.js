const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const mongoose = require("mongoose");

const Product = require("../models/product"); 
const Order = require("../models/order");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const updatedStock = [];

  try {
    const { fullName, email, phone, address, items } = req.body;

    // 1. Validate customer details
    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !address?.trim()
    ) {
      return res.status(400).json({
        message: "Please provide all customer details.",
      });
    }

    // 2. Validate cart items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty.",
      });
    }

    // 3. Combine duplicate products
    const quantities = new Map();

    for (const item of items) {
      const productId = item.productId;
      const quantity = Number(item.quantity);

      if (
        !mongoose.Types.ObjectId.isValid(productId) ||
        !Number.isSafeInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid product or quantity in your cart.",
        });
      }

      const newQuantity =
        (quantities.get(productId) || 0) + quantity;

      if (!Number.isSafeInteger(newQuantity)) {
        return res.status(400).json({
          message: "Product quantity is too large.",
        });
      }

      quantities.set(productId, newQuantity);
    }

    // 4. Calculate prices using MongoDB and reduce stock
    const orderItems = [];
    let totalAmount = 0;

    for (const [productId, quantity] of quantities) {
      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
          stock: { $gte: quantity },
        },
        {
          $inc: { stock: -quantity },
        },
        {
          new: true,
        }
      );

      if (!product) {
        throw new Error(
          "A product is unavailable or has insufficient stock."
        );
      }

      // Remember the stock change in case saving fails
      updatedStock.push({ productId, quantity });

      const lineTotal = product.price * quantity;

      if (!Number.isFinite(lineTotal)) {
        throw new Error("Invalid product price.");
      }

      totalAmount += lineTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        lineTotal,
      });
    }

    if (!Number.isFinite(totalAmount)) {
      throw new Error("Invalid order total.");
    }

    // 5. Create the order in MongoDB
    const order = await Order.create({
  userId: req.userId,
  customer: {
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    address: address.trim(),
  },
  items: orderItems,
  totalAmount,
});

    // 6. Send success response
    return res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    // 7. Restore stock if the order was not saved
    for (const item of updatedStock.reverse()) {
      try {
        await Product.updateOne(
          { _id: item.productId },
          { $inc: { stock: item.quantity } }
        );
      } catch (restoreError) {
        console.error(
          "Stock restoration failed:",
          restoreError.message
        );
      }
    }

    console.error("Order creation failed:", error.message);

    return res.status(400).json({
      message: error.message || "Unable to place your order.",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
const orders = await Order.find({
  userId: req.userId,
}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetching orders failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
});

module.exports = router;

