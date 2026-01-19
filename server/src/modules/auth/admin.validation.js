import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required().lowercase().trim().messages({
        "string.email": "Please provide a valid email address",
        "string.empty": "Email is required",
    }),
    password: Joi.string().required().min(6, "Password must be at least 6 characters long"),
});