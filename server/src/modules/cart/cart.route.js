import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem
} from "./cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.put("/update", updateCartItem);
router.delete("/remove/:id", removeCartItem);

export default router;
