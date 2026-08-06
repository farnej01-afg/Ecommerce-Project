// 1. This syntax forces dotenv to load environment variables BEFORE any other import runs
import "dotenv/config";

// 2. Standard imports
import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { cryptoWebHook } from "./controllers/paymentController.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.post(
  "/api/payments/crypto/webhook",
  express.raw({ type: "application/json" }),
  cryptoWebHook,
);

app.use(express.json());
app.use(logger);

// 3. Combined startup function
async function start() {
  try {
    // Wait for database connection
    await connectDB();
    console.log("connected to database");

    // Routes
    app.get("/", (req, res) => {
      res.send("api is running...");
    });
    app.use("/api/products", productRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/banners", bannerRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/orders", orderRoutes);

    // Error handler
    app.use(errorHandler);

    // Start server only after a successful DB connection
    app.listen(port, () => {
      console.log("listening on port", port);
    });
  } catch (err) {
    // If anything fails, it will print here
    console.error("Initialization error:", err.message);
  }
}

// 4. Run the application
start();
