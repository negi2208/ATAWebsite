import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Cart = sequelize.define(
  "carts",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true, // guest allowed
    },

    guest_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    status: {
    type: DataTypes.ENUM("ACTIVE", "ORDERED", "COMPLETED"),
    defaultValue: "ACTIVE",
  },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


Cart.belongsTo(User, { foreignKey: "user_id", as: "user" });
