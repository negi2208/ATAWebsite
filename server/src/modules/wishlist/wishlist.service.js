import { Wishlist } from "../../models/wishlist.model.js";
import { Product } from "../../models/product.model.js";

export const WishlistService = {


  async add({ user_id, guest_token, product_id }) {

    if (!user_id && !guest_token) {
      throw new Error("user_id or guest_token is required");
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
      throw new Error("Product not found");
    }

    const where = { product_id };
    if (user_id) where.user_id = user_id;
    else where.guest_token = guest_token;

    const [item] = await Wishlist.findOrCreate({ where });
    return item;
  },

  async get({ user_id, guest_token }) {

    if (!user_id && !guest_token) {
      throw new Error("user_id or guest_token is required");
    }

    const where = {};
    if (user_id) where.user_id = user_id;
    else where.guest_token = guest_token;

    return Wishlist.findAll({
      where,
      include: ["product"],
      order: [["created_at", "DESC"]],
    });
  },

  async remove({ user_id, guest_token, product_id }) {

    if (!user_id && !guest_token) {
      throw new Error("user_id or guest_token is required");
    }

    const where = { product_id };
    if (user_id) where.user_id = user_id;
    else where.guest_token = guest_token;

    const deleted = await Wishlist.destroy({ where });

    if (!deleted) {
      throw new Error("Wishlist item not found");
    }

    return true;
  },
};
