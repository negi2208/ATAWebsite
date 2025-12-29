import { CartService } from "./cart.service.js";

export const addToCart = async (req, res) => {
  try {
    const item = await CartService.add(req.body);
    res.json({
      success: true,
      message: "Item added to cart",
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await CartService.get(req.query);
    res.json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    await CartService.update(req.body);
    res.json({
      success: true,
      message: "Cart item updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    await CartService.remove(req.params.id);
    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
