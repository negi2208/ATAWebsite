import {
  registerAdminService,
  loginAdminService,
  logoutAdminService,
  getProfileService,
  updateProfileService,
} from "./admin.service.js";
import { loginSchema } from "./admin.validation.js";
import { successResponse, errorResponse } from "../../utils/helper.js";

export const registerAdminController = async (req, res) => {
  try {
    const data = await registerAdminService(req.body);
    return successResponse(res, 201, "Admin registered successfully", data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const loginAdminController = async (req, res) => {
  try {
    await loginSchema.validateAsync(req.body);

    const data = await loginAdminService(req.body);

    res.cookie("admin_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return successResponse(res, 200, "Login successful", data.admin);
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};


export const logoutAdminController = async (req, res) => {
  try {
    res.clearCookie("admin_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return successResponse(res, 200, "Logout successful");
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};

export const getProfileController = async (req, res) => {
  try {
    const data = await getProfileService(req.admin.id);
    return successResponse(res, 200, "Profile fetched", data);
  } catch (error) {
    return errorResponse(res, 401, error);
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const data = await updateProfileService(req.admin.id, req.body);
    return successResponse(res, 200, "Profile updated", data);
  } catch (error) {
    return errorResponse(res, 400, error);
  }
};
