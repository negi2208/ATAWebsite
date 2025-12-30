import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Wishlist = sequelize.define("wishlists", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.BIGINT.UNSIGNED },
  product_id: { type: DataTypes.BIGINT.UNSIGNED }
});
