import express from "express";
import { createProductController, ProductController, updateProductController } from "./product.controller.js";
import { upload } from "../../middlewares/multer.middleware.js"
import { adminAuth } from "../../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/", adminAuth, upload.any(), createProductController)
router.get("/", ProductController.getProducts);
router.get("/bestsellers", ProductController.getBestsellers);
router.get("/search", ProductController.searchProducts);
router.get("/:id", ProductController.getProductById);
router.get("/:productId/related", ProductController.getRelatedProducts);
router.put("/", adminAuth, upload.any(), updateProductController)

export default router;
