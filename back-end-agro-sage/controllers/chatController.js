// controllers/chatController.js
import { invokeBedrock } from "../services/bedrockService.js";

const MODEL_ID = "anthropic.claude-v1"; // Cambia por el modelo que quieras usar en Bedrock

export const askChat = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Faltan datos requeridos: 'prompt'" });

    const systemInstruction = `
Eres un asistente de IA experto en agricultura, cultivos, fertilizantes, y técnicas de siembra. 
Responde solo preguntas relacionadas con la agronomía y gestión agrícola. 
Si la pregunta está fuera de este tema, responde educadamente que tu función está limitada a la agricultura.
`;

    const fullPrompt = `${systemInstruction}\nUsuario: ${prompt}`;

    const respuestaLLM = await invokeBedrock(fullPrompt, MODEL_ID);

    res.json({
      reply: respuestaLLM,
      data: null
    });
  } catch (error) {
    console.error("Error en la consulta de chat:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message
    });
  }
};
