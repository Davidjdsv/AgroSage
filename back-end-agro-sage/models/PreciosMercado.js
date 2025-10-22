import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('precios_mercado', {
    id_precio: { type: DataTypes.STRING(36), primaryKey: true },
    id_cultivo: { type: DataTypes.INTEGER, allowNull: false },
    departamento: { type: DataTypes.STRING(80), allowNull: false },
    ciudad: { type: DataTypes.STRING(80), allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    unidad_medida: { type: DataTypes.STRING(20), allowNull: false },
    precio_cop: { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'precios_mercado', timestamps: false, freezeTableName: true });
