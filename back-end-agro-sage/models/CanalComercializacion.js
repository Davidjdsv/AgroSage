import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CanalComercializacion = sequelize.define("CanalComercializacion", {
  id_canal: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_canal: DataTypes.STRING(60),
  descripcion: DataTypes.STRING(200),
}, {
  tableName: "canales_comercializacion",
  timestamps: false,
});

export default CanalComercializacion;
