
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    const normalizedEmail = req.body.email?.trim().toLowerCase();

    // Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof normalizedEmail !== "string" ||
      !normalizedEmail ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide name, email, and password.",
      });
    }

    // Check whether the email already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Registration failed:", error.message);

    // Handle duplicate email errors safely
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
});

// Log in an existing user
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const normalizedEmail = req.body.email?.trim().toLowerCase();

    // Validate required fields
    if (
      typeof normalizedEmail !== "string" ||
      !normalizedEmail ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide email and password.",
      });
    }

    // Find the user using the normalized email
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Compare the entered password with the saved password hash
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Create a login token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      message: "Login successful.",
      token,
      user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
},
    });
  } catch (error) {
    console.error("Login failed:", error.message);

    return res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
});

module.exports = router;