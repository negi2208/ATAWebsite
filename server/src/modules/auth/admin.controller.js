import bcrypt from "bcrypt";
import { signToken } from "../../utils/helper.js";
import {
  registerSchema,
  loginSchema,
} from "./admin.validation.js";
import {
  createAdmin,
  findAdminByEmail,
} from "./admin.service.js";

export const registerAdmin = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const exists = await findAdminByEmail(value.email);
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const admin = await createAdmin(value);

    res.status(201).json({
      message: "Admin created",
      id: admin.id,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const admin = await findAdminByEmail(value.email);
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(value.password, admin.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: admin.id, role: "admin" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
