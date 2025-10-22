import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('recomendaciones', {
    id_recomendacion: { type: DataTypes.STRING(36), primaryKey: true },
    id_parcela: { type: DataTypes.INTEGER, allowNull: false },
    id_cultivo_sugerido: { type: DataTypes.INTEGER, allowNull: false },
    id_cultivo_alternativo: { type: DataTypes.INTEGER, allowNull: false },
    justificacion: { type: DataTypes.STRING(250), allowNull: false },
    ahorro_estimado_pct: { type: DataTypes.DECIMAL(4,2), allowNull: false },
    incremento_ingreso_pct: { type: DataTypes.DECIMAL(4,2), allowNull: false },
    riesgo_climatico_clave: { type: DataTypes.STRING(40) },
    recomendado_por_modelo: { type: DataTypes.BOOLEAN, allowNull: false }
  }, { tableName: 'recomendaciones', timestamps: false, freezeTableName: true });
