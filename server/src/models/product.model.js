export const Payment = sequelize.define("payments", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  order_id: { type: DataTypes.INTEGER, allowNull: false },

  razorpay_order_id: { type: DataTypes.STRING, allowNull: false },

  razorpay_payment_id: { type: DataTypes.STRING },

  razorpay_signature: { type: DataTypes.STRING },

  amount: {
    type: DataTypes.INTEGER, // paisa
    allowNull: false,
  },

  currency: {
    type: DataTypes.STRING,
    defaultValue: "INR",
  },

  status: {
    type: DataTypes.ENUM(
      "CREATED",
      "SUCCESS",
      "FAILED",
      "REFUNDED"
    ),
    defaultValue: "CREATED",
  },
});
