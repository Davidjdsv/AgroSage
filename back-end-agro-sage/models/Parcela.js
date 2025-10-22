import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('parcelas', {
    id_parcela: { type: DataTypes.INTEGER, primaryKey: true },
    id_agricultor: { type: DataTypes.INTEGER, allowNull: false },
    id_suelo: { type: DataTypes.INTEGER, allowNull: false },
    nombre_parcela: { type: DataTypes.STRING(80), allowNull: false },
    ubicacion_gps: { type: DataTypes.STRING(50) },
    departamento: { type: DataTypes.STRING(80), allowNull: false },
    ciudad: { type: DataTypes.STRING(80), allowNull: false },
    altitud_msnm: { type: DataTypes.INTEGER },
    ph_suelo: { type: DataTypes.DECIMAL(4,2) },
    fuente_agua: { type: DataTypes.BOOLEAN },
    sistema_riego: { type: DataTypes.STRING(30), allowNull: false }
  }, { tableName: 'parcelas', timestamps: false, freezeTableName: true });
