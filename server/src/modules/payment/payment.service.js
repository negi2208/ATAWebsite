import crypto from "crypto";
import razorpay from "../../config/razorpay.js";
import { Payment } from "../../models/payment.model.js";

export const createRazorpayOrder = async ({ orderId, amount }) => {
  const order = await razorpay.orders.create({
    amount: amount * 100, // paisa
    currency: "INR",
    receipt: `order_${orderId}`,
  });

  await Payment.create({
    order_id: orderId,
    razorpay_order_id: order.id,
    amount: order.amount,
    currency: "INR",
    status: "CREATED",
  });

  return order;
};

export const verifyPayment = async (payload) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payload;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    await Payment.update(
      { status: "FAILED" },
      { where: { razorpay_order_id } }
    );
    throw new Error("Invalid payment signature");
  }

  await Payment.update(
    {
      razorpay_payment_id,
      razorpay_signature,
      status: "SUCCESS",
    },
    { where: { razorpay_order_id } }
  );

  return true;
};

export const refundPayment = async ({ razorpay_payment_id, amount }) => {
  const refund = await razorpay.payments.refund(
    razorpay_payment_id,
    { amount: amount * 100 }
  );

  await Payment.update(
    { status: "REFUNDED" },
    { where: { razorpay_payment_id } }
  );

  return refund;
};
