import { sequelize } from "../../config/database.js";
import { Cart } from "../../models/cart.model.js";
import { CartItem } from "../../models/cartItem.model.js";
import { Order } from "../../models/order.model.js";
import { OrderItem } from "../../models/orderItem.model.js";

export const OrderService = {
  async createFromCart({ user_id, guest_token, payment_status = "PAID" }) {
    return await sequelize.transaction(async (t) => {

      const cart = await Cart.findOne({
        where: {
          status: "ACTIVE",
          ...(user_id && { user_id }),
          ...(guest_token && { guest_token }),
        },
        include: [{ model: CartItem, as: "items" }],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      // ===============================
      // 🔥 STEP 1: SUBTOTAL
      // ===============================
      const subTotal = cart.items.reduce(
        (sum, i) => sum + Number(i.price) * i.quantity,
        0
      );

      // ===============================
      // 🔥 STEP 2: GST (18%)
      // ===============================
      const tax = Math.round(subTotal * 0.18);

      // ===============================
      // 🔥 STEP 3: FINAL TOTAL
      // ===============================
      const totalAmount = subTotal + tax;

      // ===============================
      // 🔥 STEP 4: CREATE ORDER
      // ===============================
      const order = await Order.create(
        {
          user_id: user_id || null,
          cart_id: cart.id,
          total_amount: totalAmount, // ✅ GST INCLUDED
          payment_status,
          order_status: "PLACED",
        },
        { transaction: t }
      );

      // ===============================
      // ORDER ITEMS
      // ===============================
      const orderItems = cart.items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.price,
      }));

      await OrderItem.bulkCreate(orderItems, { transaction: t });

      // ===============================
      // CART STATUS UPDATE
      // ===============================
      cart.status = "ORDERED";
      await cart.save({ transaction: t });

      // ===============================
      // 🔥 RETURN EXTRA DATA (NO DB)
      // ===============================
      return {
        ...order.toJSON(),
        subTotal,
        tax,
        total: totalAmount,
        items: orderItems,
      };
    });
  },
};