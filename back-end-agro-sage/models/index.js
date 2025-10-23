import Agricultor from "./Agricultor.js";
import Parcela from "./Parcela.js";
import PlanSiembra from "./PlanSiembra.js";
import RegistroClima from "./RegistroClima.js";
import SueloCatalogo from "./SueloCatalogo.js";
import InsumoCatalogo from "./InsumoCatalogo.js";
import CostoInsumoParcela from "./CostoInsumoParcela.js";
import PrecioMercado from "./PrecioMercado.js";
import Recomendacion from "./Recomendacion.js";
import CultivoCatalogo from "./CultivoCatalogo.js";
import CanalComercializacion from "./CanalComercializacion.js";

// ======================
// Relaciones entre modelos
// ======================

// Agricultor -> Parcela
Agricultor.hasMany(Parcela, { foreignKey: "id_agricultor", as: "parcelas" });
Parcela.belongsTo(Agricultor, { foreignKey: "id_agricultor", as: "agricultor" });

// Parcela -> Plan de Siembra
Parcela.hasMany(PlanSiembra, { foreignKey: "id_parcela", as: "planes" });
PlanSiembra.belongsTo(Parcela, { foreignKey: "id_parcela", as: "parcela" });

// Agricultor -> Plan de Siembra
Agricultor.hasMany(PlanSiembra, { foreignKey: "id_agricultor", as: "planesAgricultor" });
PlanSiembra.belongsTo(Agricultor, { foreignKey: "id_agricultor", as: "agricultorPlan" });

// Catálogos -> Plan de Siembra
CultivoCatalogo.hasMany(PlanSiembra, { foreignKey: "id_cultivo", as: "planesCultivo" });
PlanSiembra.belongsTo(CultivoCatalogo, { foreignKey: "id_cultivo", as: "cultivo" });

CanalComercializacion.hasMany(PlanSiembra, { foreignKey: "canal_comercial_preferido", as: "planesCanal" });
PlanSiembra.belongsTo(CanalComercializacion, { foreignKey: "canal_comercial_preferido", as: "canal" });

// ======================
// Exportar modelos
// ======================
export {
  Agricultor,
  Parcela,
  PlanSiembra,
  RegistroClima,
  SueloCatalogo,
  InsumoCatalogo,
  CostoInsumoParcela,
  PrecioMercado,
  Recomendacion,
  CultivoCatalogo,
  CanalComercializacion,
};
