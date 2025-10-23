import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Parcela from "./Parcela.js";
import CultivoCatalogo from "./CultivoCatalogo.js";
import CanalComercializacion from "./CanalComercializacion.js";

const PlanSiembra = sequelize.define("PlanSiembra", {
  id_plan: { type: DataTypes.STRING(36), primaryKey: true },
  id_parcela: DataTypes.INTEGER,
  id_cultivo: DataTypes.INTEGER,
  fecha_siembra: DataTypes.DATE,
  fecha_cosecha_estimada: DataTypes.DATE,
  mano_obra_dia_cop: DataTypes.INTEGER,
  canal_comercial_preferido: DataTypes.INTEGER,
  objetivo: DataTypes.STRING(60),
}, {
  tableName: "planes_siembra",
  timestamps: false,
});

export default PlanSiembra;
