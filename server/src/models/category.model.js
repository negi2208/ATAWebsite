import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(150), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    parent_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    depth: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: 0 },
    path: { type: DataTypes.STRING(2000), defaultValue: "/" },
    is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
  },
  {
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
