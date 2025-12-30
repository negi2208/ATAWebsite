import { Cart, CartItem } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";

export const addToCart = async (req, res) => {
  const { guest_token, user_id, product_id, variant_id, quantity } = req.body;

  let cart = await Cart.findOne({
    where: {
      status: "ACTIVE",
      ...(user_id ? { user_id } : { guest_token })
    }
  });

  if (!cart) {
    cart = await Cart.create({ user_id, guest_token });
  }

  const product = await Product.findByPk(product_id);

  const item = await CartItem.create({
    cart_id: cart.id,
    product_id,
    variant_id,
    quantity: quantity || 1,
    price: product.price
  });

  res.json({ success: true, item });
};

export const getCart = async (req, res) => {
  const { guest_token, user_id } = req.query;

  const cart = await Cart.findOne({
    where: {
      status: "ACTIVE",
      ...(user_id ? { user_id } : { guest_token })
    },
    include: [{ model: CartItem }]
  });

  res.json({ success: true, cart });
};

export const updateCartItem = async (req, res) => {
  const { itemId, quantity } = req.body;
  await CartItem.update({ quantity }, { where: { id: itemId } });
  res.json({ success: true });
};

export const removeCartItem = async (req, res) => {
  await CartItem.destroy({ where: { id: req.params.itemId } });
  res.json({ success: true });
};
