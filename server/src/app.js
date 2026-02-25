import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import adminRoutes from "./modules/auth/admin.routes.js";
import paymentRoutes from "./modules/payment/payment.route.js";
import categoryRoutes from "./modules/category/category.routes.js";
import adminManagementRoutes from "./modules/management/adminManagement.routes.js";
import productRoutes from "./modules/product/product.route.js";
import wishlistRoutes from "./modules/wishlist/wishlist.route.js";
import cartRoutes from "./modules/cart/cart.route.js";
import contactRoutes from "./modules/contactUs/contactRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// 🔥 IMPORTANT: serve uploads
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/management", adminManagementRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is healthy 💚" });
});

// app.post("/invoice", async (req, res) => {
//   try {
//     const invoiceData = req.body;

//     const invoiceId = uuidv4();
//     const fileName = `invoice-${invoiceId}.pdf`;
//     const filePath = path.join(invoiceDir, fileName);

//     await generateInvoice(invoiceData, filePath)

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `inline; filename="${fileName}"`
//     );

//     return res.sendFile(filePath);
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Invoice generation failed",
//       error: error.message
//     });
//   }
// })

export default app;