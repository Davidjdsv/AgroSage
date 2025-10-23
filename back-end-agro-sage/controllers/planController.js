// controllers/planController.js
import { PlanSiembra, Parcela } from "../models/index.js";
import { invokeBedrock } from "../services/bedrockService.js";

const MODEL_ID = "anthropic.claude-v1"; // Cambia por el modelo que quieras usar en Bedrock

export const generatePlan = async (req, res) => {
  try {
    const { cultivo, area, fechaSiembra } = req.body;
    const id_agricultor = req.user.id_agricultor;

    if (!cultivo || !area || !fechaSiembra) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const parcela = await Parcela.findOne({ where: { id_agricultor } });
    if (!parcela) {
      return res.status(404).json({ error: "No se encontró una parcela asociada al agricultor" });
    }

    const nuevoPlan = await PlanSiembra.create({
      id_parcela: parcela.id_parcela,
      cultivo,
      area,
      fechaSiembra,
      estado: "Generando plan con IA..."
    });

    const prompt = `
Eres un asistente agrícola experto. 
Genera un plan de siembra para el cultivo de ${cultivo}, en un área de ${area} hectáreas, 
con fecha estimada de siembra el ${fechaSiembra}.
Incluye: 
1. Fechas estimadas de preparación del terreno, siembra, riego, fertilización y cosecha.
2. Recomendaciones sobre insumos, fertilizantes y control de plagas.
3. Consejos para optimizar la producción según el tipo de cultivo.
4. Formato JSON estructurado con campos: tareas, recomendaciones y calendario.
`;

    const planIA = await invokeBedrock(prompt, MODEL_ID);

    await nuevoPlan.update({
      estado: "Plan generado",
      detalles: planIA
    });

    res.json({
      message: "✅ Plan de siembra generado correctamente",
      plan: nuevoPlan,
      planIA
    });

  } catch (error) {
    console.error("Error al generar plan:", error);
    res.status(500).json({
      error: "Error interno",
      details: error.message
    });
  }
};
