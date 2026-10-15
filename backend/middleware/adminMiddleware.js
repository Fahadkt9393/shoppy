
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin verification error:", error.message);

    return res.status(500).json({
      message: "Unable to verify admin access.",
    });
  }
};

module.exports = adminMiddleware;
