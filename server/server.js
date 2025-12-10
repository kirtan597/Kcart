import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mangodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 5000;

// Only connect to DB and Cloudinary if credentials are provided
if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'your_mongodb_connection_string') {
  connectDB();
} else {
  console.log("⚠️  Running in DEMO MODE without MongoDB");
}

if (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_NAME !== 'your_cloudinary_name') {
  connectCloudinary();
} else {
  console.log("⚠️  Running in DEMO MODE without Cloudinary");
}

// Middleware configuration
app.use(express.json());
app.use(cors());

// Api Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (request, response) => {
  response.send("API Working");
});

app.listen(port, () => console.log("Server Started on PORT :" + port));
