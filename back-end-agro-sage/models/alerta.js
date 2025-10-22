import {sequelize} from './conection.js';
import {DataTypes} from 'sequelize';

export const alertas = sequelize.define('Alertas', {
    id_alertas: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    
}, {
    tableName: 'agricultores',
    timestamps: false
});