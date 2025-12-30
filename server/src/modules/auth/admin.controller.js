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
    await adminRegisterSchema.validateAsync(req.body);
    const data = await registerAdminService(req.body);
    return successResponse(res, 201, "Admin registered successfully", data);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const loginAdminController = async (req, res) => {
  try {
    await loginSchema.validateAsync(req.body);
    const data = await loginAdminService(req.body);
    return successResponse(res, 200, "Login successful", data);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const logoutAdminController = async (req, res) => {
  try {
    await logoutAdminService();
    return successResponse(res, 200, "Logout successful");
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const getProfileController = async (req, res) => {
  try {
    const data = await getProfileService(req.admin.id);
    return successResponse(res, 200, "Profile fetched", data);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const updateProfileController = async (req, res) => {
  try {
    await adminUpdateSchema.validateAsync(req.body);
    const data = await updateProfileService(req.admin.id, req.body);
    return successResponse(res, 200, "Profile updated", data);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};
