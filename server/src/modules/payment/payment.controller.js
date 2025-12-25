import {
  createRazorpayOrder,
  verifyPayment,
  refundPayment,
} from "./payment.service.js";

import {
  createOrderSchema,
  verifyPaymentSchema,
  refundSchema,
} from "./payment.validation.js";

export const createOrder = async (req, res) => {
  const { error, value } = createOrderSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const order = await createRazorpayOrder(value);

  res.json({
    success: true,
    order,
  });
};

export const verifyPaymentController = async (req, res) => {
  const { error, value } = verifyPaymentSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  await verifyPayment(value);

  res.json({
    success: true,
    message: "Payment verified successfully",
  });
};

export const refundController = async (req, res) => {
  const { error, value } = refundSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const refund = await refundPayment(value);

  res.json({
    success: true,
    refund,
  });
};
