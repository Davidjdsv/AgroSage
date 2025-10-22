import Sequelize from "sequelize";
import sequelize from "../config/db.js";

// --- Imports ---

// El modelo Agricultor sigue como exportación nombrada (clase definida directamente).
import { Agricultor } from "./Agricultor.js"; 

// Corregido: TareaPlan ahora se importa como exportación nombrada (clase definida directamente)
// y se quita el alias 'Definition' ya que no es una función.
import { TareaPlan } from "./TareaPlan.js";

// Asumiendo que el resto de los modelos usan exportación por defecto (función de definición).
import ParcelaDefinition from "./Parcela.js";
import SuelosCatalogoDefinition from "./SuelosCatalogo.js";
import InsumosCatalogoDefinition from "./InsumosCatalogo.js";
import PlanSiembraDefinition from "./PlanSiembra.js";

// --- Inicialización ---

// Agricultor ya es la clase definida
const Agricultores = Agricultor; 

// TareaPlan ahora es la clase definida directamente
const TareasPlan = TareaPlan; 

// Inicializamos los modelos que sí usan funciones de definición
const Parcelas = ParcelaDefinition(sequelize, Sequelize.DataTypes);
const SuelosCatalogos = SuelosCatalogoDefinition(sequelize, Sequelize.DataTypes);
const InsumosCatalogos = InsumosCatalogoDefinition(sequelize, Sequelize.DataTypes);
const PlanSiembras = PlanSiembraDefinition(sequelize, Sequelize.DataTypes);


// --- Asociaciones (Relaciones) ---

// Relaciones existentes
Agricultores.hasMany(Parcelas, { foreignKey: "id_agricultor" });
Parcelas.belongsTo(Agricultores, { foreignKey: "id_agricultor" });

// Asociaciones para TareasPlan y PlanSiembras (ahora ambas variables son clases de modelo válidas)
TareasPlan.belongsTo(PlanSiembras, { foreignKey: "id_plan_siembra" }); 
PlanSiembras.hasMany(TareasPlan, { foreignKey: "id_plan_siembra" }); 


// --- Exports ---

// Exporta todos los modelos (incluyendo los nuevos)
export { Agricultores, Parcelas, SuelosCatalogos, InsumosCatalogos, PlanSiembras, TareasPlan };