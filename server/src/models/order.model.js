import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { OrderItem } from "./orderItem.model.js";
import { User } from "./user.model.js";

export const Order = sequelize.define("orders", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED },
  cart_id: { type: DataTypes.BIGINT.UNSIGNED },
  total_amount: { type: DataTypes.DECIMAL(10, 2) },
  payment_status: { type: DataTypes.ENUM("PENDING", "PAID", "FAILED") },
  order_status: {
    type: DataTypes.ENUM("PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED")
  }
},
  {
    timestamps: true,                  // enable timestamps
    createdAt: "created_at",           // map db column
    updatedAt: false,           // map db column
    underscored: true,
  }
);

Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "User",
});