import express from "express";
import {
  createOrder,
  verifyPaymentController,
  refundController,
} from "./payment.controller.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPaymentController);
router.post("/refund", refundController);

export default router;
