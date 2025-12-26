export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: DataTypes.STRING(255),
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    address: DataTypes.TEXT,
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1, // ✅ active by default
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: false,
  }
);