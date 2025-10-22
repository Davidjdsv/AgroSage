import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('insumos_catalogo', {
    id_insumo: { type: DataTypes.INTEGER, primaryKey: true },
    nombre_insumo: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    categoria: { type: DataTypes.STRING(40), allowNull: false },
    precio_base_cop: { type: DataTypes.INTEGER, allowNull: false },
    iva_pct: { type: DataTypes.TINYINT, defaultValue: 19 }
  }, { tableName: 'insumos_catalogo', timestamps: false, freezeTableName: true });
