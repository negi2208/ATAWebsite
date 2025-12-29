import Joi from "joi";


export const addToCartSchema = Joi.object({
  guest_token: Joi.string().optional(),
  user_id: Joi.number().integer().optional(),

  product_id: Joi.number().integer().required(),
  variant_id: Joi.number().integer().optional(),

  quantity: Joi.number().integer().min(1).default(1),
})
  .or("guest_token", "user_id");


export const getCartSchema = Joi.object({
  guest_token: Joi.string().optional(),
  user_id: Joi.number().integer().optional(),
}).or("guest_token", "user_id");


export const updateCartItemSchema = Joi.object({
  itemId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});
