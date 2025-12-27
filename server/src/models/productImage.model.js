import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ProductVariant } from "./productVariant.model.js";

export const ProductImage = sequelize.define(
  "ProductImage",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    variant_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    front_img: { type: DataTypes.STRING(500), allowNull: false },
    left_img: { type: DataTypes.STRING(500), allowNull: false },
    right_img: { type: DataTypes.STRING(500), allowNull: false },
  },
  { tableName: "product_images", timestamps: true }
);

// relations
ProductVariant.hasOne(ProductImage, { foreignKey: "variant_id", as: "ProductImage" });
ProductImage.belongsTo(ProductVariant, { foreignKey: "variant_id", as: "variant" });