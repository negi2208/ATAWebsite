import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const User = sequelize.define(
  "users",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    full_name: DataTypes.STRING(255),
    email: { type: DataTypes.STRING(255), unique: true },
    password: DataTypes.STRING,
    phone: { type: DataTypes.STRING(20), unique: true },
    address: DataTypes.TEXT,
    status: { type: DataTypes.ENUM("active", "inactive"), defaultValue: "active" },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    last_login_at: DataTypes.DATE,
    last_login_ip: DataTypes.STRING(45),
    deleted_at: DataTypes.DATE,
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at", paranoid: false }
);
