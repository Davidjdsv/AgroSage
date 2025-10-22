import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('planes_siembra', {
    id_plan: { type: DataTypes.STRING(36), primaryKey: true },
    id_parcela: { type: DataTypes.INTEGER, allowNull: false },
    id_cultivo: { type: DataTypes.INTEGER, allowNull: false },
    fecha_siembra: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_cosecha_estimada: { type: DataTypes.DATEONLY, allowNull: false },
    mano_obra_dia_cop: { type: DataTypes.INTEGER, allowNull: false },
    canal_comercial_preferido: { type: DataTypes.INTEGER, allowNull: false },
    objetivo: { type: DataTypes.STRING(60), allowNull: false }
  }, { tableName: 'planes_siembra', timestamps: false, freezeTableName: true });
