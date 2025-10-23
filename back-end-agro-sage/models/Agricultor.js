import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Agricultor = sequelize.define("Agricultor", {
  id_agricultor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_completo: DataTypes.STRING(150),
  cedula: DataTypes.STRING(12),
  telefono_movil: DataTypes.STRING(25),
  direccion: DataTypes.STRING(120),
  barrio_vereda: DataTypes.STRING(80),
  departamento: DataTypes.STRING(80),
  municipio: DataTypes.STRING(30),
  contrasena: DataTypes.STRING(30),
}, {
  tableName: "agricultores",
  timestamps: false,
});

export default Agricultor;
