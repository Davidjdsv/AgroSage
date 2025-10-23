import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import CultivoCatalogo from "./CultivoCatalogo.js";

const CalendarioAgricola = sequelize.define("CalendarioAgricola", {
  id_calendario: { type: DataTypes.STRING(36), primaryKey: true },
  id_cultivo: DataTypes.INTEGER,
  zona_altitud: DataTypes.STRING(10),
  siembra_mes_ini: DataTypes.TINYINT,
  siembra_mes_fin: DataTypes.TINYINT,
  duracion_meses: DataTypes.TINYINT,
}, {
  tableName: "calendario_agricola",
  timestamps: false,
});

export default CalendarioAgricola;