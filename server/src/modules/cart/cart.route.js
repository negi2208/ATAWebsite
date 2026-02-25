import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "./cart.controller.js";

import { validate } from "../../middlewares/validate.js";
import {
  addToCartSchema,
  getCartSchema,
  updateCartItemSchema,
} from "./cart.validation.js";

const router = express.Router();

router.post(
  "/add",
  validate(addToCartSchema),
  addToCart
);

router.get(
  "/",
  validate(getCartSchema, "query"),
  getCart
);

router.put(
  "/update",
  validate(updateCartItemSchema),
  updateCartItem
);

router.delete("/remove/:id", removeCartItem);

export default router;
