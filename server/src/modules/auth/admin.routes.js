import express from "express";
import {
  registerAdminController,
  loginAdminController,
  logoutAdminController,
  getProfileController,
  updateProfileController,
} from "./admin.controller.js";
import { adminAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdminController);
router.post("/login", loginAdminController);
router.post("/logout", logoutAdminController);

router.get("/profile", adminAuth, getProfileController);
router.put("/profile", adminAuth, updateProfileController);

export default router;
