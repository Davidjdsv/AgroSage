import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Parcela from "./Parcela.js";

const RegistroClima = sequelize.define("RegistroClima", {
  id_registro: { type: DataTypes.STRING(36), primaryKey: true },
  id_parcela: DataTypes.INTEGER,
  fecha: DataTypes.DATE,
  tmin_c: DataTypes.DECIMAL(4,1),
  tmax_c: DataTypes.DECIMAL(4,1),
  tmed_c: DataTypes.DECIMAL(4,1),
  lluvia_mm: DataTypes.DECIMAL(6,1),
}, {
  tableName: "registros_clima",
  timestamps: false,
});

export default RegistroClima;
