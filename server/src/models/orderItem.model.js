import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const OrderItem = sequelize.define("order_items", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.BIGINT.UNSIGNED },
  product_id: { type: DataTypes.BIGINT.UNSIGNED },
  variant_id: { type: DataTypes.BIGINT.UNSIGNED },
  quantity: { type: DataTypes.INTEGER },
  price: { type: DataTypes.DECIMAL(10, 2) }
});
