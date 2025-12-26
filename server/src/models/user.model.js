import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: DataTypes.STRING(255),
    phone: DataTypes.STRING(20),
    address: DataTypes.TEXT,
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: false,
  }
);