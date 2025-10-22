import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Agricultores = sequelize.define(
  "Agricultores",
  {
    id_agricultor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    telefono_movil: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    barrio_vereda: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    departamento: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    municipio: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    tableName: "agricultores",
    timestamps: false,
  }
);
