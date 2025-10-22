import { DataTypes } from 'sequelize';
import { sequelize } from '../db/conexion.js';
import PlanSiembra, { hasMany } from './PlanSiembra';

export const TareaPlan = sequelize.define('TareaPlan', {
  id_tarea: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // id_plan (FK)
  etapa: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  responsable: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  completada: {
    type: DataTypes.BOOLEAN, // BIT(1)
    allowNull: false,
  },
}, {
  tableName: 'tareas_plan',
  timestamps: false,
  indexes: [
    { fields: ['id_plan', 'etapa'] }
  ]
});

// Relación
TareaPlan.belongsTo(PlanSiembra, { foreignKey: 'id_plan', onDelete: 'RESTRICT' }); // fk_tarea_plan
hasMany(TareaPlan, { foreignKey: 'id_plan' });
