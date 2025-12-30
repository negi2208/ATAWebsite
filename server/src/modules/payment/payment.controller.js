import { Payment } from "../../models/payment.model.js";
import { User } from "../../models/user.model.js";
import {
  createPaymentOrder,
  verifyPayment,
  updatePaymentStatus,
  refundPayment,
} from "./payment.service.js";

export const placeOrder = async (req, res) => {
  try {
    const { user, amount } = req.body;

    let userId;
    if (!user?.id) {
      const newUser = await User.create({
        full_name: user.full_name,
        phone: user.phone,
        address: user.address,
        status: 1,
      });
      userId = newUser.id;
    } else {
      userId = user.id;
    }

    const razorpayOrder = await createPaymentOrder(userId, amount);

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID, // ✅ REQUIRED
      order: razorpayOrder,
    });
  } catch (err) {
    console.error("Error in placeOrder:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const confirmPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const isValid = await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });

    if (!isValid) {
      await updatePaymentStatus(razorpay_order_id, "FAILED");
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const payment = await updatePaymentStatus(razorpay_order_id, "SUCCESS", razorpay_payment_id, razorpay_signature);

    res.json({ success: true, message: "Payment successful", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const refundOrder = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const payment = await Payment.findOne({ where: { razorpay_order_id } });
    if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });

    const refund = await refundPayment(payment.razorpay_payment_id, payment.amount);
    payment.status = "REFUNDED";
    await payment.save();

    res.json({ success: true, message: "Payment refunded", refund });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
