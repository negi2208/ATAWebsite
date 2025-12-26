import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const CartItem = sequelize.define("cart_items", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  cart_id: { type: DataTypes.BIGINT.UNSIGNED },
  product_id: { type: DataTypes.BIGINT.UNSIGNED },
  variant_id: { type: DataTypes.BIGINT.UNSIGNED },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  price: { type: DataTypes.DECIMAL(10, 2) }
});
