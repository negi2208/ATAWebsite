import express from "express";
import { ContactController } from "./contactController.js";
import { validate } from "../../middlewares/validate.js";
import { createContactSchema } from "./contactValidation.js";

const router = express.Router();

// Public
router.post(
  "/",
  validate(createContactSchema),
  ContactController.createContact
);

// Admin (optional)
router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getContactById);

export default router;
