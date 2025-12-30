import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ProductVariant } from "./productVariant.model.js";

export const OrderItem = sequelize.define("order_items", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.BIGINT.UNSIGNED },
  product_id: { type: DataTypes.BIGINT.UNSIGNED },
  variant_id: { type: DataTypes.BIGINT.UNSIGNED },
  quantity: { type: DataTypes.INTEGER },
  price: { type: DataTypes.DECIMAL(10, 2) }
},
  {
    timestamps: true,                  // enable timestamps
    createdAt: "created_at",           // map db column
    updatedAt: false,           // map db column
    underscored: true,
  }
);

OrderItem.belongsTo(ProductVariant, { foreignKey: "variant_id", as: "variant" });