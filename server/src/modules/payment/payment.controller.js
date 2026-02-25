import { sequelize } from "../../config/database.js";
import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";
import { OrderItem } from "../../models/orderItem.model.js";
import { Payment } from "../../models/payment.model.js";
import { User } from "../../models/user.model.js";
import { generateInvoice } from "../../utils/generateInvoice.js";
import { sendInvoice } from "../../utils/mailer.js";
import { OrderService } from "../order/order.service.js";
import {
  createPaymentOrder,
  verifyPayment,
  updatePaymentStatus,
  refundPayment,
} from "./payment.service.js";
import path from 'path'
import { v4 as uuidv4 } from "uuid";

export const placeOrder = async (req, res) => {
  try {
    const { user, amount, guest_token } = req.body;

    let finalUser;

    if (!user?.id) {
      finalUser = await User.create({
        full_name: user.full_name,
        phone: user.phone,
        address: user.address,
        status: 1,
      });

      await Cart.update(
        { user_id: finalUser.id },
        {
          where: {
            guest_token,
            status: "ACTIVE",
          },
        }
      );
    } else {
      finalUser = await User.findByPk(user.id);
    }

    const razorpayOrder = await createPaymentOrder(finalUser.id, amount);

    return res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order: razorpayOrder,
      user_id: finalUser.id,
    });
  } catch (err) {
    console.error("Error in placeOrder:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user_id,
      guest_token,
    } = req.body;

    // 1️⃣ Verify Razorpay signature
    const isValid = verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isValid) {
      await updatePaymentStatus(razorpay_order_id, "FAILED");
      return res.status(400).json({
        success: false,
        message: "Invalid payment",
      });
    }

    // 2️⃣ Create order FROM CART (🔥 FIX)
    const order = await OrderService.createFromCart({
      user_id,
      guest_token,

    });

    // 3️⃣ Update payment status
    await updatePaymentStatus(
      razorpay_order_id,
      "SUCCESS",
      razorpay_payment_id,
      razorpay_signature
    );

    const invoiceId = uuidv4();
    const invoicePath = path.join(
      process.cwd(),
      "invoices",
      `invoice-${invoiceId}.pdf`
    );

    const invoiceData = {
      invoiceNumber: invoiceId,
      invoiceDate: new Date().toLocaleDateString(),
      seller: {
        name: "My Company Pvt Ltd",
        address: "Lucknow, India",
      },
      customer: {
        name: order.customer_name,
        email: order.customer_email,
        address: order.customer_address,
      },
      items: order.items,
      subTotal: order.subTotal,
      tax: order.tax,
      total: order.total,
    };

    // generateInvoice
    // await generateInvoice(invoiceData, invoicePath);

    // generateInvoice
    // await sendInvoice({
    //   email: order.customer_email,
    //   invoicePath,
    //   invoiceNo: invoiceId,
    //   orderId: order.id,
    // });

    return res.json({
      success: true,
      order_id: order.id,
      message: "Order placed successfully",
    });
  } catch (err) {
    console.error("CONFIRM PAYMENT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
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

export const placeCODOrder = async (req, res) => {
  try {
    const { user, amount, guest_token } = req.body;

    let finalUser;

    if (!user?.id) {
      finalUser = await User.create({
        full_name: user.full_name,
        phone: user.phone,
        address: user.address,
        status: 1,
      });

      await Cart.update(
        { user_id: finalUser.id },
        {
          where: {
            guest_token,
            status: "ACTIVE",
          },
        }
      );
    } else {
      finalUser = await User.findByPk(user.id);
    }

    // Create order FROM CART
    const order = await OrderService.createFromCart({
      user_id: finalUser.id,
      guest_token,
      payment_status: "PENDING",
    });

    // Create payment record with COD status
    await Payment.create({
      order_id: order.id,
      razorpay_order_id: `COD_${Date.now()}`,
      amount,
      status: "COD",
    });

    return res.json({
      success: true,
      order_id: order.id,
      message: "Order placed successfully with COD",
    });
  } catch (err) {
    console.error("Error in placeCODOrder:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
