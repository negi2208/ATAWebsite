import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Product } from "./product.model.js";

export const ProductVariant = sequelize.define(
  "ProductVariant",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    part_no: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    variant_name: { type: DataTypes.STRING(200) },
    color: { type: DataTypes.STRING(80) },
    is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
  },
  { tableName: "product_variants", timestamps: true, createdAt: "created_at", updatedAt: false  }
);

// relations
Product.hasMany(ProductVariant, { foreignKey: "product_id" });
ProductVariant.belongsTo(Product, { foreignKey: "product_id" });