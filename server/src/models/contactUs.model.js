import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ContactUs = sequelize.define(
  "contact_us",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(255),
    subject: DataTypes.STRING(200),
    message: DataTypes.TEXT,
  },
  { timestamps: true, createdAt: "created_at", updatedAt: false }
);
