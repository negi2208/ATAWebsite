import express from "express";
import { ProductController } from "./product.controller.js";

const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/bestsellers", ProductController.getBestsellers);
router.get("/search", ProductController.searchProducts);
router.get("/:id", ProductController.getProductById);
router.get("/:productId/related", ProductController.getRelatedProducts);


export default router;
