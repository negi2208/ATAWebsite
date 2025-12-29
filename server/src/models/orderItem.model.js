import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Order } from "./order.model.js";
import { Product } from "./product.model.js";
import { ProductVariant } from "./productVariant.model.js";

export const OrderItem = sequelize.define("order_items", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  variant_id: { type: DataTypes.BIGINT.UNSIGNED },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
},
 { tableName: "order_items", timestamps: true, createdAt: "created_at", updatedAt: false });


Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

OrderItem.belongsTo(Product, { foreignKey: "product_id" });
OrderItem.belongsTo(ProductVariant, { foreignKey: "variant_id" });
