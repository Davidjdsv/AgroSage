import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import CultivoCatalogo from "./CultivoCatalogo.js";

const PrecioMercado = sequelize.define("PrecioMercado", {
  id_precio: { type: DataTypes.STRING(36), primaryKey: true },
  id_cultivo: DataTypes.INTEGER,
  departamento: DataTypes.STRING(80),
  ciudad: DataTypes.STRING(80),
  fecha: DataTypes.DATE,
  unidad_medida: DataTypes.STRING(20),
  precio_cop: DataTypes.INTEGER,
}, {
  tableName: "precios_mercado",
  timestamps: false,
});


export default PrecioMercado;
