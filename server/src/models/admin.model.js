import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Admin = sequelize.define(
  "admin",
  {
    id: { type: DataTypes.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING(50),
    email: { type: DataTypes.STRING(30), unique: true },
    password: DataTypes.STRING,
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);
