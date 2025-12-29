import express from "express";
import {
  addWishlist,
  removeWishlist,
  getWishlist,
} from "./wishlist.controller.js";

import { validate } from "../../middlewares/validate.js";
import {
  addWishlistSchema,
  getWishlistSchema,
  removeWishlistSchema,
} from "./wishlist.validation.js";

const router = express.Router();

router.post(
  "/add",
  validate(addWishlistSchema),
  addWishlist
);

router.get(
  "/",
  validate(getWishlistSchema, "query"),
  getWishlist
);

router.delete(
  "/remove/:productId",
  validate(removeWishlistSchema),
  removeWishlist
);

export default router;
