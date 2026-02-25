import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";
import { Product } from "./product.model.js";

export const Wishlist = sequelize.define(
  "wishlists",
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

    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "guest_token", "product_id"],
      },
    ],
  }
);

Wishlist.belongsTo(User, { foreignKey: "user_id", as: "user" });
Wishlist.belongsTo(Product, { foreignKey: "product_id", as: "product" });

User.hasMany(Wishlist, { foreignKey: "user_id" });
Product.hasMany(Wishlist, { foreignKey: "product_id" });
