import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().max(255).required(),
    subject: Joi.string().min(5).max(200).required(),
    message: Joi.string().allow("", null),
  });
