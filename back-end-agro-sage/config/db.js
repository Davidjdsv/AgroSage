import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "nombre_db",
  process.env.DB_USER || "usuario",
  process.env.DB_PASSWORD || "contraseña",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;