import { Wishlist } from "../../models/wishlist.model.js";

export const addToWishlist = async (req, res) => {
  const { user_id, product_id } = req.body;
  await Wishlist.findOrCreate({ where: { user_id, product_id } });
  res.json({ success: true });
};

export const removeFromWishlist = async (req, res) => {
  const { user_id } = req.body;
  await Wishlist.destroy({
    where: { user_id, product_id: req.params.productId }
  });
  res.json({ success: true });
};

export const getWishlist = async (req, res) => {
  const { user_id } = req.query;
  const items = await Wishlist.findAll({ where: { user_id } });
  res.json({ success: true, items });
};
