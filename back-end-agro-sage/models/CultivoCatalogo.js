import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CultivoCatalogo = sequelize.define("CultivoCatalogo", {
  id_cultivo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_cultivo: DataTypes.STRING(60),
  descripcion: DataTypes.STRING(200),
  siembra_mes_ini: DataTypes.TINYINT,
  siembra_mes_fin: DataTypes.TINYINT,
  cosecha_meses: DataTypes.TINYINT,
}, {
  tableName: "cultivos_catalogo",
  timestamps: false,
});

export default CultivoCatalogo;
