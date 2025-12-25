import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProductImage = sequelize.define(
  "product_images",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    variant_id: DataTypes.BIGINT.UNSIGNED,
    front_img: DataTypes.STRING(500),
    back_img: DataTypes.STRING(500),
    side_img: DataTypes.STRING(500),
  },
  { timestamps: true, createdAt: "created_at", updatedAt: false }
);
