import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('clima_registro', {
    id_registro: {
      type: DataTypes.UUID, // Asumo UUID para varchar(36) y clave primaria
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    id_parcela: {
      type: DataTypes.INTEGER,
      allowNull: false
      // Esto sería una FK, que se define en las asociaciones (no en el modelo base)
    },
    fecha: {
      type: DataTypes.DATEONLY, // Usamos DATEONLY para solo la fecha
      allowNull: false
      // Esto también puede ser parte de una clave compuesta o índice único
    },
    tmin_c: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: true // Asumo que los datos climáticos podrían ser nulos
    },
    tmax_c: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: true
    },
    tmed_c: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: true
    },
    lluvia_mm: {
      type: DataTypes.DECIMAL(6, 1),
      allowNull: true
    }
  }, {
    tableName: 'clima_registro', // Nombre de tabla ajustado a los datos
    timestamps: false, // Asumo que no hay campos createdAt/updatedAt
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
  });