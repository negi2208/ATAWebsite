import { WishlistService } from "./wishlist.service.js";

export const addWishlist = async (req, res) => {
  try {
    const item = await WishlistService.add(req.body);

    res.json({
      success: true,
      message: "Product added to wishlist",
      data: item,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const items = await WishlistService.get(req.query);

    res.json({
      success: true,
      message: "Wishlist fetched successfully",
      data: items,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    await WishlistService.remove({
      ...req.body,
      product_id: req.params.productId,
    });

    res.json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
