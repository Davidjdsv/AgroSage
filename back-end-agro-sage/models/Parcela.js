import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Agricultor from "./Agricultor.js";
import SueloCatalogo from "./SueloCatalogo.js";

const Parcela = sequelize.define("Parcela", {
  id_parcela: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_agricultor: DataTypes.INTEGER,
  id_suelo: DataTypes.INTEGER,
  nombre_parcela: DataTypes.STRING(80),
  ubicacion_gps: DataTypes.STRING(50),
  departamento: DataTypes.STRING(80),
  ciudad: DataTypes.STRING(80),
  altitud_msnm: DataTypes.INTEGER,
  ph_suelo: DataTypes.DECIMAL(4,2),
  fuente_agua: DataTypes.BOOLEAN,
  sistema_riego: DataTypes.STRING(30),
}, {
  tableName: "parcelas",
  timestamps: false,
});

export default Parcela;
