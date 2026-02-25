import express from "express";
import { placeOrder, confirmPayment, refundOrder, placeCODOrder } from "./payment.controller.js";

const router = express.Router();

router.post("/create", placeOrder);
router.post("/verify", confirmPayment);
router.post("/refund", refundOrder); // optional for admin/auto refund
router.post("/cod", placeCODOrder);

export default router;
