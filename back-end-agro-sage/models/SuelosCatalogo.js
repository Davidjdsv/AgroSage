import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('suelos_catalogo', {
    id_suelo: { type: DataTypes.INTEGER, primaryKey: true },
    tipo_suelo: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING(200), allowNull: false },
    ph_referencia: { type: DataTypes.DECIMAL(4,2) }
  }, { tableName: 'suelos_catalogo', timestamps: false, freezeTableName: true });
