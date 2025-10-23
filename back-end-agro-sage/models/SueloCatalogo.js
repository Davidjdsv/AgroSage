import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SueloCatalogo = sequelize.define("SueloCatalogo", {
  id_suelo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo_suelo: DataTypes.STRING(40),
  descripcion: DataTypes.STRING(200),
  ph_referencia: DataTypes.DECIMAL(4,2),
}, {
  tableName: "suelos_catalogo",
  timestamps: false,
});

export default SueloCatalogo;
