import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Payment = sequelize.define(
  "payments",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    razorpay_order_id: { type: DataTypes.STRING, allowNull: false },
    razorpay_payment_id: { type: DataTypes.STRING },
    razorpay_signature: { type: DataTypes.STRING },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    currency: { type: DataTypes.STRING, defaultValue: "INR" },
    status: {
      type: DataTypes.ENUM("CREATED", "SUCCESS", "FAILED", "REFUNDED", "COD"),
      defaultValue: "CREATED",
    },
  },
 { tableName: "payments", timestamps: true, createdAt: true, updatedAt: true }
);
