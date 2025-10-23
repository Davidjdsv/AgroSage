import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Parcela from "./Parcela.js";

const Alerta = sequelize.define("Alerta", {
  id_alerta: { type: DataTypes.STRING(36), primaryKey: true },
  id_parcela: DataTypes.INTEGER,
  riesgo: DataTypes.STRING(30),
  severidad: DataTypes.STRING(10),
  fecha_alerta: DataTypes.DATE,
  mensaje: DataTypes.STRING(250),
}, {
  tableName: "alertas",
  timestamps: false,
});

Alerta.belongsTo(Parcela, { foreignKey: "id_parcela", as: "parcela" });

export default Alerta;
