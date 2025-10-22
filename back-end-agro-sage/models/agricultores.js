
import {sequelize} from './conection.js';
import {DataTypes} from 'sequelize';

export const Agricultores = sequelize.define('Agricultores', {
    id_agricultor: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono_contacto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barrio_vereda: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    municipio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'agricultores',
    timestamps: false
});