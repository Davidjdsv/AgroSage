import {DataTypes} from 'sequelize';
import {sequelize} from './conection.js'; 

export const calendario_agricola = sequelize.define('calendario_agricola', {
    id_calendario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    id_cultivo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    zona_altitud: {
        type: DataTypes.STRING,
        allowNull: false
    },
    siembra_mes_ini: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    siembra_mes_fin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duracion_meses: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'calendario_agricola',
    timestamps: false
});
