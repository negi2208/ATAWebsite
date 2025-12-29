import express from "express";
import { ProductController } from "./product.controller.js";

const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/bestsellers", ProductController.getBestsellers);
router.get("/:id", ProductController.getProductById);

export default router;
