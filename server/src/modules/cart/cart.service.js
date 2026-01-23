import { Cart } from "../../models/cart.model.js";
import { CartItem } from "../../models/cartItem.model.js";
import { Product } from "../../models/product.model.js";
import { ProductVariant } from "../../models/productVariant.model.js";
import { ProductImage } from "../../models/productImage.model.js";

export const CartService = {

  async add({ guest_token, user_id, product_id, variant_id, quantity = 1 }) {
    let cart = await Cart.findOne({
      where: {
        status: "ACTIVE",
        ...(user_id ? { user_id } : { guest_token }),
      },
    });

    if (!cart) {
      cart = await Cart.create({ user_id, guest_token });
    }

    const product = await Product.findByPk(product_id);

    return CartItem.create({
      cart_id: cart.id,
      product_id,
      variant_id,
      quantity,
      price: product.price,
    });
  },

  async get({ guest_token, user_id }) {
  const where = { status: "ACTIVE" };

  if (user_id) where.user_id = user_id;
  else if (guest_token) where.guest_token = guest_token;
  else throw new Error("guest_token or user_id is required");

  return Cart.findOne({
    where,
    include: [
      {
        model: CartItem,
        as: "items",
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "brand", "price"],
          },
          {
            model: ProductVariant,
            as: "variant",
            attributes: ["id", "variant_name", "color"],
            include: [
              {
                model: ProductImage,
                as: "ProductImage",
                attributes: ["front_img"], // 🔥 सिर्फ front_img
              },
            ],
          },
        ],
      },
    ],
  });
},

  async update({ itemId, quantity }) {
    await CartItem.update(
      { quantity },
      { where: { id: itemId } }
    );
  },


  async remove(id) {
    await CartItem.destroy({ where: { id } });
  },
};
