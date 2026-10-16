# Shoppy - MERN E-Commerce Website

Shoppy is a full-stack e-commerce web application built using the MERN stack. It allows users to browse products, manage their shopping cart, place orders, and view their order history. Administrators can manage products, view orders, and update order statuses.

## Features

### Customer Features

- Browse available products
- View individual product details
- Add products to the shopping cart
- Manage cart items and quantities
- Proceed through checkout and place orders
- Register and log in securely
- View previous orders

### Admin Features

- View dashboard statistics
- Add, update, and delete products
- View customer orders
- Update order statuses
- Access administrative features through role-based authorization

## Technologies Used

### Frontend

- React
- JavaScript
- Vite
- CSS
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## Screenshots

### Home Page

![Shoppy Home Page](screenshots/shoppy-home.png)

### Shop Page

![Shoppy Shop Page](screenshots/shoppy-shop.png)

### Product Details

![Shoppy Product Details](screenshots/shoppy-product.png)

### My Orders

![Shoppy My Orders](screenshots/shoppy-orders.png)

## Project Structure

```text
shoppy/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── screenshots/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database or MongoDB connection URI
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Fahadkt9393/shoppy.git
cd shoppy
```

### 2. Set Up the Backend

Open a terminal in the project directory and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory with your own configuration:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

Replace the example values with your actual local configuration. Never publish your real database credentials or JWT secret on GitHub.

Start the backend server:

```bash
node server.js
```

Keep the backend terminal running.

### 3. Set Up the Frontend

Open a second terminal window. Navigate to the project root directory if necessary, then run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Security

- Passwords are hashed before being stored.
- JWT is used for authentication.
- Administrative operations are protected by authentication and role-based authorization.
- Environment variables are kept out of version control.

## Future Improvements

- Add product search and filtering
- Improve form validation and error handling
- Add automated tests
- Deploy the frontend and backend
- Integrate a secure payment gateway

## Author

**Fahad K.T**

GitHub: [Fahadkt9393](https://github.com/Fahadkt9393)

---

This project was developed for Shoppy is a full-stack e-commerce web application built using the MERN stack. It includes user authentication, product management, shopping cart functionality, checkout, order management, and inventory tracking.