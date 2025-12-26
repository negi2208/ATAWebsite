import express from "express";
import { ProductController } from "./product.controller.js";

const router = express.Router();

router.get("/", ProductController.getProducts);

export default router;
