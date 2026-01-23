import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Category } from "./category.model.js";

export const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(200), allowNull: false },

    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    product_type: {
      type: DataTypes.ENUM("single", "kit"),
      allowNull: false,
      defaultValue: "single",
    },

    brand: { type: DataTypes.STRING(50), allowNull: false },

    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

    model_year: { type: DataTypes.STRING(20) },

    exterior_finish: { type: DataTypes.STRING(255) },
    material: { type: DataTypes.STRING(255) },
    item_dimensions: { type: DataTypes.STRING(255) },

    description: { type: DataTypes.TEXT },

    is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });