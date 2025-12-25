import Joi from "joi";

/**
 * Create Razorpay Order
 */
export const createOrderSchema = Joi.object({
  orderId: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(), // rupees
});

/**
 * Verify Payment
 */
export const verifyPaymentSchema = Joi.object({
  razorpay_order_id: Joi.string().required(),
  razorpay_payment_id: Joi.string().required(),
  razorpay_signature: Joi.string().required(),
});

/**
 * Refund Payment
 */
export const refundSchema = Joi.object({
  razorpay_payment_id: Joi.string().required(),
  amount: Joi.number().positive().required(), // rupees
});
