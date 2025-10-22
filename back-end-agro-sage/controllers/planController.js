import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { bedrockClient } from "../config/bedrockClient.js";
import {
  Agricultores as Agricultor,
  Parcela,
  SuelosCatalogo as Suelo,
  InsumosCatalogo,
  PlanSiembra,
  RegistroClima,
  CostosInsumoParcela,
  PreciosMercado,
  Recomendacion,
  TareaPlan,
} from "../models/index.js";

export const generatePlan = async (req, res) => {
  const { id_agricultor } = req.user;

  try {
    //Obtener datos relevantes del agricultor
    const parcelas = await Parcela.findAll({
      where: { id_agricultor },
      include: [
        { model: Suelo, attributes: ["tipo_suelo", "ph_referencia", "descripcion"] },
        {
          model: PlanSiembra,
          include: [{ model: InsumosCatalogo, attributes: ["nombre_InsumosCatalogo", "descripcion"] }],
        },
        {
          model: RegistroClima,
          attributes: ["fecha", "tmin_c", "tmax_c", "tmed_c", "lluvia_mm"],
          limit: 5,
          order: [["fecha", "DESC"]],
        },
      ],
    });

    if (!parcelas.length)
      return res.status(404).json({ error: "No hay parcelas registradas para este agricultor." });

    //Obtener datos económicos
    const [precios, costos, recomendaciones] = await Promise.all([
      PreciosMercado.findAll({ limit: 5 }),
      CostosInsumoParcela.findAll({ where: { id_parcela: parcelas.map(p => p.id_parcela) } }),
      Recomendacion.findAll({ where: { id_parcela: parcelas.map(p => p.id_parcela) } }),
    ]);

    //Crear contexto para el LLM (sin datos personales)
    const contexto = `
Eres AgroSage, un asistente agrícola experto.
Tu tarea es generar un plan agrícola detallado y personalizado basado en los siguientes datos.

No reveles información de otros agricultores ni datos personales.
El plan debe incluir:
1. Preparación del suelo
2. Qué sembrar y cuándo
3. Fertilización y riego
4. Riesgos climáticos y cómo mitigarlos
5. Cosecha
6. Alternativa de InsumosCatalogo con comparación de costos y beneficios.

Datos agrícolas:
${JSON.stringify({ parcelas, precios, costos, recomendaciones }, null, 2)}

Formato de salida (JSON):
{
  "preparacion": "...",
  "siembra": "...",
  "fertilizacion": "...",
  "riesgos": "...",
  "cosecha": "...",
  "alternativa": {
     "InsumosCatalogo": "...",
     "ahorro_estimado_pct": "...",
     "incremento_ingreso_pct": "..."
  }
}
`;

    // Llamada al modelo AI21 (Bedrock)
    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID,
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are AgroSage, an agricultural AI assistant." },
          { role: "user", content: contexto },
        ],
        max_output_tokens: 1000,
        temperature: 0.4,
      }),
      contentType: "application/json",
      accept: "application/json",
    });

    const response = await bedrockClient.send(command);
    const body = JSON.parse(new TextDecoder().decode(response.body));
    const output = body?.output_text || "{}";
    const plan = JSON.parse(output);

    //Guardar tareas en la tabla tareas_plan
    for (const [etapa, detalle] of Object.entries(plan)) {
      if (["preparacion", "siembra", "fertilizacion", "riesgos", "cosecha"].includes(etapa)) {
        await TareaPlan.create({
          id_tarea: crypto.randomUUID(),
          id_plan: parcelas[0].PlanSiembra?.id_plan,
          etapa,
          fecha_inicio: new Date(),
          fecha_fin: new Date(),
          responsable: "Agricultor",
          completada: 0,
        });
      }
    }

    return res.json({ plan });
  } catch (error) {
    console.error("Error generando plan:", error);
    return res.status(500).json({ error: "Error interno", details: error.message });
  }
};
