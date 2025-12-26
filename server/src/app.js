import express from "express";
import cors from "cors";

// import productRoutes from "./modules/product/product.route.js";
import paymentRoutes from "./modules/payment/payment.route.js";
import categoryRoutes from "./modules/category/category.routes.js";

const app = express();

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// routes
// app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/categories", categoryRoutes);

// health check
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy 💚" });
});

export default app;
