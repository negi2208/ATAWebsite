import Joi from "joi";


export const addWishlistSchema = Joi.object({
  user_id: Joi.number().integer().optional(),
  guest_token: Joi.string().optional(),

  product_id: Joi.number().integer().required(),
})
  .or("user_id", "guest_token");


export const getWishlistSchema = Joi.object({
  user_id: Joi.number().integer().optional(),
  guest_token: Joi.string().optional(),
})
  .or("user_id", "guest_token");


export const removeWishlistSchema = Joi.object({
  user_id: Joi.number().integer().optional(),
  guest_token: Joi.string().optional(),
})
  .or("user_id", "guest_token");
