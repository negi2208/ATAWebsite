import jwt from "jsonwebtoken";

const SECRET = "your_secret_key_here";

export const signToken = (payload) =>
  jwt.sign(payload, SECRET, { expiresIn: "7d" });

export const verifyToken = (token) => jwt.verify(token, SECRET);

export const successResponse = (res,status, message, data) => {
    return res.status(status).json({
        success: true,
        message,
        data:data
    })
}

export const errorResponse = (res, status = 500, error) => {
    return res.status(status).json({
        success: false,
        message: error.message || "Something went wrong",
        error: error.errors
    })
}