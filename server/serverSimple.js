import express from "express";
import cors from "cors";
import "dotenv/config";

// Import simplified controllers
import { addProduct, listProduct, removeProduct, singleProduct } from "./controllers/productControllerSimple.js";
import { loginUser, registerUser, adminLogin } from "./controllers/userControllerSimple.js";
import { addToCart, updateCart, getUserCart } from "./controllers/cartControllerSimple.js";
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from "./controllers/orderControllerSimple.js";
import authUser from "./middleware/authSimple.js";
import adminAuth from "./middleware/adminAuthSimple.js";

// App Config
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.path}`);
  next();
});

// API Endpoints

// Product Routes
app.post("/api/product/add", adminAuth, addProduct);
app.post("/api/product/remove", adminAuth, removeProduct);
app.post("/api/product/single", singleProduct);
app.get("/api/product/list", listProduct);

// User Routes
app.post("/api/user/register", registerUser);
app.post("/api/user/login", loginUser);
app.post("/api/user/admin", adminLogin);

// Cart Routes
app.post("/api/cart/get", authUser, getUserCart);
app.post("/api/cart/add", authUser, addToCart);
app.post("/api/cart/update", authUser, updateCart);

// Order Routes
app.post("/api/order/list", adminAuth, allOrders);
app.post("/api/order/status", adminAuth, updateStatus);
app.post("/api/order/place", authUser, placeOrder);
app.post("/api/order/stripe", authUser, placeOrderStripe);
app.post("/api/order/razorpay", authUser, placeOrderRazorpay);
app.post("/api/order/userorders", authUser, userOrders);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API Working - Demo Mode");
});

app.listen(port, () => {
  console.log("🚀 Server Started on PORT: " + port);
  console.log("📦 Running in DEMO MODE (no database required)");
  console.log("👤 Admin Login: admin@demo.com / admin123");
});
