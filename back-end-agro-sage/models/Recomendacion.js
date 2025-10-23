import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Parcela from "./Parcela.js";
import CultivoCatalogo from "./CultivoCatalogo.js";

const Recomendacion = sequelize.define("Recomendacion", {
  id_recomendacion: { type: DataTypes.STRING(36), primaryKey: true },
  id_parcela: DataTypes.INTEGER,
  id_cultivo_sugerido: DataTypes.INTEGER,
  id_cultivo_alternativo: DataTypes.INTEGER,
  justificacion: DataTypes.STRING(250),
  ahorro_estimado_pct: DataTypes.DECIMAL(4,2),
  incremento_ingreso_pct: DataTypes.DECIMAL(4,2),
  riesgo_climatico_clave: DataTypes.STRING(40),
  recomendado_por_modelo: DataTypes.BOOLEAN,
}, {
  tableName: "recomendaciones",
  timestamps: false,
});

export default Recomendacion;
