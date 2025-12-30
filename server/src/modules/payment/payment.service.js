import razorpay from "../../config/razorpay.js";
import { Payment } from "../../models/payment.model.js";
import crypto from "crypto";

/**
 * ================================
 * CREATE PAYMENT ORDER
 * ================================
 * amount → rupees
 */
export const createPaymentOrder = async (userId, amount) => {
  if (!amount || amount <= 0) {
    throw new Error("Invalid amount");
  }

  // Create Razorpay order (REAL)
  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(amount * 100), // ₹ → paisa (MANDATORY)
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  });

  // Store in DB
  await Payment.create({
    order_id: userId,
    razorpay_order_id: razorpayOrder.id,
    amount, // store in rupees
    status: "CREATED",
  });

  return razorpayOrder;
};

/**
 * ================================
 * VERIFY PAYMENT SIGNATURE
 * ================================
 */
export const verifyPayment = ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  return generatedSignature === razorpay_signature;
};

/**
 * ================================
 * UPDATE PAYMENT STATUS
 * ================================
 */
export const updatePaymentStatus = async (
  razorpay_order_id,
  status,
  payment_id = null,
  signature = null
) => {
  const payment = await Payment.findOne({
    where: { razorpay_order_id },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  payment.status = status;

  if (payment_id) payment.razorpay_payment_id = payment_id;
  if (signature) payment.razorpay_signature = signature;

  await payment.save();
  return payment;
};

/**
 * ================================
 * REFUND PAYMENT
 * ================================
 */
export const refundPayment = async (razorpay_payment_id, amount) => {
  if (!razorpay_payment_id) {
    throw new Error("razorpay_payment_id is required for refund");
  }

  const refund = await razorpay.payments.refund(
    razorpay_payment_id,
    amount
      ? { amount: Math.round(amount * 100) }
      : undefined // full refund if amount not provided
  );

  return refund;
};
