import bcrypt from "bcrypt";
import { Admin } from "../../models/admin.model.js";

export const findAdminByEmail = (email) =>
  Admin.findOne({ where: { email } });

export const createAdmin = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ name, email, password: hashed });
  return admin;
};
