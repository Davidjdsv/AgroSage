import Sequelize from "sequelize";
import sequelize from "../config/db.js";
import Agricultores from "./Agricultor.js";
import parcelas from "./Parcela.js";
import suelos_catalogo from "./SuelosCatalogo.js";
import insumos_catalogo from "./InsumosCatalogo.js";
import planes_siembra from "./PlanSiembra.js";

const Agricultores = Agricultores(sequelize, Sequelize.DataTypes);
const Parcela = parcelas(sequelize, Sequelize.DataTypes);
const SuelosCatalogo = suelos_catalogo(sequelize, Sequelize.DataTypes);
const InsumosCatalogo = insumos_catalogo(sequelize, Sequelize.DataTypes);
const PlanSiembra = planes_siembra(sequelize, Sequelize.DataTypes);

// Relaciones
Agricultores.hasMany(Parcela, { foreignKey: "id_agricultor" });
Parcela.belongsTo(Agricultores, { foreignKey: "id_agricultor" });

Parcela.belongsTo(InsumosCatalogo, { foreignKey: "id_suelo" });
Parcela.hasMany(PlanSiembra, { foreignKey: "id_parcela" });

PlanSiembra.belongsTo(Cultivo, { foreignKey: "id_cultivo" });

export { Agricultores, Parcela, SuelosCatalogo, InsumosCatalogo, PlanSiembra };
