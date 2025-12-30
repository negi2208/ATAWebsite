import express from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from "./wishlist.controller.js";

const router = express.Router();

router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);
router.get("/", getWishlist);

export default router;
