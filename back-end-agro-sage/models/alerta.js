import {sequelize} from './conection.js';
import {DataTypes} from 'sequelize';

export const alertas = sequelize.define('Alertas', {
    id_alertas: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_parcelas: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    riesgo: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Severidad: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        primaryKey: true
    },
    
}, {
    tableName: 'agricultores',
    timestamps: false
});