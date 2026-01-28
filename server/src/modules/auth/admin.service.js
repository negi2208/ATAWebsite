import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../../models/admin.model.js";

export const registerAdminService = async (payload) => {
  const { name, email, password } = payload;

  const exists = await Admin.findOne({ where: { email } });
  if (exists) throw new Error("Email already registered");

  const hash = await bcrypt.hash(password, 10);

  const admin = await Admin.create({ name, email, password: hash });

  return { id: admin.id, name: admin.name, email: admin.email };
};

export const loginAdminService = async ({ email, password }) => {
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: admin.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    admin: { id: admin.id, name: admin.name, email: admin.email },
  };
};

export const logoutAdminService = async () => {
  return true; // client will simply delete token
};

export const getProfileService = async (adminId) => {
  const admin = await Admin.findByPk(adminId, {
    attributes: ["id", "name", "email"],
  });

  if (!admin) throw new Error("Admin not found");
  return admin;
};

export const updateProfileService = async (adminId, body) => {
  const admin = await Admin.findByPk(adminId);
  if (!admin) throw new Error("Admin not found");

  if (body.name) admin.name = body.name;

  if (body.email) admin.email = body.email;
  
  if (body.password) {
    admin.password = await bcrypt.hash(body.password, 10);
  }

  await admin.save();

  return { id: admin.id, name: admin.name, email: admin.email };
};
