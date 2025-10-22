import fetch from "node-fetch"; // npm i node-fetch@3
import crypto from "crypto";
import CostosInsumoParcela from "../models/CostosInsumoParcela.js";
import RegistroClima from "../models/RegistroClima.js";
import PreciosMercado from "../models/PreciosMercado.js";
import Recomendacion from "../models/Recomendacion.js";
import { TareaPlan } from "../models/TareaPlan.js";

// Se asume que estos son los nombres correctos de las clases modelo:
import {
  Parcelas,
  SuelosCatalogos, // Corregido: Usar SuelosCatalogos en lugar de Suelo
  InsumosCatalogos,
  PlanSiembras, // Corregido: Usar PlanSiembras en lugar de PlanSiembra
} from "../models/index.js";

// Configuración de la API de Gemini (modelo y endpoint)
const GEMINI_API_MODEL = "gemini-2.5-flash-preview-09-2025";
const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

export const generatePlan = async (req, res) => {
  const { id_agricultor } = req.user;

  try {
    // 1. Obtener datos relevantes del agricultor (Corrección de nombres de modelos)
    const parcelas = await Parcelas.findAll({
      where: { id_agricultor },
      include: [
        // Usar SuelosCatalogos en lugar de Suelo (asumido por imports)
        { model: SuelosCatalogos, attributes: ["tipo_suelo", "ph_referencia", "descripcion"] },
        {
          // Usar PlanSiembras en lugar de PlanSiembra (asumido por imports)
          model: PlanSiembras,
          include: [{ model: InsumosCatalogos, attributes: ["nombre_InsumosCatalogo", "descripcion"] }],
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

    // Obtener IDs de parcelas para consultas económicas
    const parcelaIds = parcelas.map((p) => p.id_parcela);

    // Obtener datos económicos y recomendaciones
    const [precios, costos, recomendaciones] = await Promise.all([
      PreciosMercado.findAll({ limit: 5 }),
      CostosInsumoParcela.findAll({ where: { id_parcela: parcelaIds } }),
      Recomendacion.findAll({ where: { id_parcela: parcelaIds } }),
    ]);

    // 2. Definir instrucciones y query para el LLM

    // Instrucción del sistema (define la personalidad y el formato de salida)
    const systemPrompt = `Eres AgroSage, un asistente agrícola experto de clase mundial.
Tu tarea es generar un plan agrícola detallado y personalizado en formato JSON, basado en los datos proporcionados.
El plan debe ser una respuesta única, concisa y basada en el análisis de la información y en datos actuales del mercado y el clima (gracias a la búsqueda de Google).

El plan debe incluir las siguientes secciones clave:
1. Preparación del suelo (preparacion)
2. Qué sembrar y cuándo (siembra)
3. Fertilización y riego (fertilizacion)
4. Riesgos climáticos y cómo mitigarlos (riesgos)
5. Cosecha (cosecha)
6. Alternativa de Insumos (alternativa)

No incluyas explicaciones, encabezados, sub-encabezados o texto fuera de la estructura JSON. Usa el idioma español.

Estructura JSON obligatoria:
{
  "preparacion": "Resumen de las tareas de preparación del suelo.",
  "siembra": "Recomendación de siembra, incluyendo fechas y cultivos.",
  "fertilizacion": "Estrategia de fertilización y riego específica para el tipo de suelo y clima.",
  "riesgos": "Identificación de riesgos climáticos y sugerencias de mitigación.",
  "cosecha": "Tiempo estimado y métodos recomendados para la cosecha.",
  "alternativa": {
    "insumo_alternativo": "Nombre del Insumo Catalogo alternativo y su beneficio principal.",
    "ahorro_estimado_pct": "Porcentaje de ahorro estimado en costos (ej: 15%).",
    "incremento_ingreso_pct": "Porcentaje de incremento estimado en ingresos/rendimiento (ej: 10%)."
  }
}
`;

    // Query del usuario (los datos a analizar)
    const userQuery = `Analiza los siguientes datos agrícolas para generar el plan. No reveles información de otros agricultores ni datos personales.

Datos:
${JSON.stringify({ parcelas, precios, costos, recomendaciones }, null, 2)}
`;

    // 3. Llamada al modelo Gemini con el nuevo formato y grounding

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `${GEMINI_API_BASE_URL}/${GEMINI_API_MODEL}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      // Establecer la personalidad y las reglas de formato
      systemInstruction: { parts: [{ text: systemPrompt }] },
      // Habilitar Google Search para grounding de información en tiempo real
      tools: [{ google_search: {} }],
      // Configuración para forzar la respuesta JSON
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la API de Gemini: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    // Extraer el texto de la respuesta JSON
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    let plan;
    try {
      plan = JSON.parse(output);
    } catch (e) {
      console.error("Error al parsear el JSON del LLM:", e, "Output recibido:", output);
      throw new Error("El modelo generó un formato JSON inválido.");
    }

    // 4. Guardar tareas en la tabla tareas_plan
    // Se asume que PlanSiembras es una relación HasMany y tomamos el primer plan asociado a la primera parcela.
    const planSiembraAssociation = parcelas[0].PlanSiembras;
    const idPlan = Array.isArray(planSiembraAssociation) && planSiembraAssociation.length > 0
        ? planSiembraAssociation[0].id_plan
        : null;

    if (idPlan) {
        // Guardar las etapas del plan como tareas
        for (const [etapa, detalle] of Object.entries(plan)) {
            // detalle puede ser un objeto (para 'alternativa') o una cadena.
            const detalleString = typeof detalle === 'object' ? JSON.stringify(detalle) : detalle;

            if (["preparacion", "siembra", "fertilizacion", "riesgos", "cosecha"].includes(etapa)) {
                await TareaPlan.create({
                    id_tarea: crypto.randomUUID(),
                    id_plan: idPlan,
                    etapa,
                    // Se usan new Date() como en el código original.
                    fecha_inicio: new Date(),
                    fecha_fin: new Date(),
                    responsable: "Agricultor",
                    completada: 0,
                    descripcion: detalleString // Guardar el detalle como descripción
                });
            }
        }
    } else {
        console.warn("No se encontró un ID de PlanSiembra válido para asociar las tareas.");
    }

    return res.json({ plan });
  } catch (error) {
    console.error("Error generando plan:", error);
    // Incluir detalles del error para una mejor depuración
    return res.status(500).json({ error: "Error interno", details: error.message });
  }
};
