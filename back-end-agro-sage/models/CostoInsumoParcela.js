import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('costos_insumo_parcela', {
    id_costo: { type: DataTypes.STRING(36), primaryKey: true },
    id_parcela: { type: DataTypes.INTEGER, allowNull: false },
    id_insumo: { type: DataTypes.INTEGER, allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio_unitario_cop: { type: DataTypes.INTEGER, allowNull: false },
    subtotal_cop: { type: DataTypes.INTEGER, allowNull: false },
    iva_cop: { type: DataTypes.INTEGER, allowNull: false },
    total_cop: { type: DataTypes.INTEGER, allowNull: false },
    proveedor: { type: DataTypes.STRING(100), allowNull: false }
  }, { tableName: 'costos_insumo_parcela', timestamps: false, freezeTableName: true });
