import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProductVariant = sequelize.define(
  "product_variants",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_id: DataTypes.BIGINT.UNSIGNED,
    part_no: { type: DataTypes.STRING(30), unique: true },
    variant_name: DataTypes.STRING(200),
    color: DataTypes.STRING(80),
    is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);
