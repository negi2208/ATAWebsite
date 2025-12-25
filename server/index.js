import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { sequelize } from "./src/config/database.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
