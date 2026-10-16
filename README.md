# Shoppy - MERN E-Commerce Website

Shoppy is a full-stack e-commerce web application built using the MERN stack. It allows users to browse products, manage their shopping cart, place orders, and view their order history. Admins can manage products and update order statuses.

## Features

### Customer Features
- Browse available products
- View individual product details
- Add products to the shopping cart
- Proceed through checkout and place orders
- Register and log in securely
- View previous orders

### Admin Features
- View dashboard statistics
- Add, update, and delete products
- View customer orders
- Update order statuses
- Access admin features with role-based authorization

## Technologies Used

**Frontend**
- React
- JavaScript
- Vite
- CSS

**Backend**
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

### 1. Clone the Repository

```bash
git clone https://github.com/Fahadkt9393/shoppy.git
cd shoppy
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

Replace the example values with your own local configuration. Never commit real credentials or secrets to GitHub.

Start the backend:

```bash
node server.js
```

Keep this terminal running.

### 3. Set Up the Frontend

Open a second terminal and navigate to the project root:

```bash
cd ~/Desktop/shoppy/frontend
npm install
npm run dev
```

If you cloned the repository somewhere else, replace `~/Desktop/shoppy/frontend` with the path to your own `shoppy/frontend` folder.

Open the local URL shown by Vite in your terminal.

## Security
- Keep environment variables and credentials out of GitHub.
- Protect admin operations with authentication and authorization middleware.
- Hash passwords and keep JWT secrets private.

## Future Improvements
- Add product search and filtering
- Improve form validation and error handling
- Add automated tests
- Deploy the frontend and backend
- Integrate a secure payment gateway

## Author

**Fahad K.**

GitHub: https://github.com/Fahadkt9393

---

This project was developed for learning and portfolio purposes.