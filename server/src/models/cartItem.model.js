import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Cart } from "./cart.model.js";
import { Product } from "./product.model.js";
import { ProductVariant } from "./productVariant.model.js";

export const CartItem = sequelize.define(
  "cart_items",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    cart_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    variant_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id", as: "cart" });

Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });

ProductVariant.hasMany(CartItem, { foreignKey: "variant_id" });
CartItem.belongsTo(ProductVariant, { foreignKey: "variant_id", as: "variant" });
