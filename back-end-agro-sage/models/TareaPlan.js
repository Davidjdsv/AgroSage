import { DataTypes } from 'sequelize';
import sequelize  from '../config/db.js';
import PlanSiembra from './PlanSiembra.js';

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

