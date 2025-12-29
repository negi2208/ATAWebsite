import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Order = sequelize.define("orders", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED },
  cart_id: { type: DataTypes.BIGINT.UNSIGNED },
  total_amount: { type: DataTypes.DECIMAL(10, 2) },
  payment_status: { type: DataTypes.ENUM("PENDING", "PAID", "FAILED") },
  order_status: {
    type: DataTypes.ENUM("PLACED","CONFIRMED","SHIPPED","DELIVERED","CANCELLED")
  }
},
 { tableName: "orders", timestamps: true, createdAt: "created_at", updatedAt: false });
