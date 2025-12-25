import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Category = sequelize.define(
  "categories",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    name_hindi: DataTypes.STRING(150),
    slug: { type: DataTypes.STRING(160), allowNull: false },
    parent_id: DataTypes.BIGINT.UNSIGNED,
    depth: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: 0 },
    path: { type: DataTypes.STRING(2000), defaultValue: "/" },
    ancestors: DataTypes.STRING(2000),
    is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
    sort_order: DataTypes.INTEGER.UNSIGNED,
    image_url: DataTypes.STRING(500),
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);
