import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Cart = sequelize.define("carts", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
  guest_token: { type: DataTypes.STRING(100), allowNull: true },
  status: { type: DataTypes.ENUM("ACTIVE", "ORDERED"), defaultValue: "ACTIVE" }
});
