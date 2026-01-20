import express from "express";
import { addProductController, ProductController } from "./product.controller.js";

const router = express.Router();

router.post("/", addProductController)
router.get("/", ProductController.getProducts);
router.get("/bestsellers", ProductController.getBestsellers);
router.get("/search", ProductController.searchProducts);
router.get("/:id", ProductController.getProductById);
router.get("/:productId/related", ProductController.getRelatedProducts);


export default router;
