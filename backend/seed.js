const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");

dotenv.config();

const products = [
  {
    name: "Classic Watch",
    price: 1299,
    image: "/images/watch.jpg",
    description: "A classic watch designed for everyday use.",
    category: "Accessories",
    stock: 25,
  },
  {
    name: "Wireless Headphones",
    price: 1999,
    image: "/images/headphones.jpg",
    description:
      "Enjoy clear sound with comfortable wireless headphones.",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Smart Backpack",
    price: 999,
    image: "/images/backpack.jpg",
    description:
      "A practical backpack for everyday travel and work.",
    category: "Bags",
    stock: 30,
  },
  {
    name: "Running Shoes",
    price: 2000,
    image: "/images/shoes.jpg",
    description:
      "Comfortable shoes suitable for everyday activities.",
    category: "Footwear",
    stock: 15,
  },
  {
    name: "Bluetooth Speaker",
    price: 1499,
    image: "/images/Bluetooth Speaker.jpg",
    description:
      "Enjoy clear and powerful sound with this portable Bluetooth speaker.",
    category: "Electronics",
    stock: 18,
  },
  {
    name: "Power Bank",
    price: 1099,
    image: "/images/Power Bank.jpg",
    description:
      "A convenient power bank for charging your devices while traveling.",
    category: "Electronics",
    stock: 22,
  },
  {
    name: "Sandals",
    price: 899,
    image: "/images/Sandals.jpg",
    description:
      "Comfortable sandals designed for everyday use.",
    category: "Footwear",
    stock: 25,
  },
  {
    name: "RC Car",
    price: 1299,
    image: "/images/RC Car.jpg",
    description:
      "A fun remote-controlled car suitable for indoor and outdoor play.",
    category: "Toys",
    stock: 12,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products added successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error.message);
  }
};

seedProducts();
