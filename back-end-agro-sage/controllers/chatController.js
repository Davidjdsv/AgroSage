// Archivo: controllers/chatController.js (Nuevo archivo)
import { invokeGemini } from "../services/geminiService.js"; // función que usa la API de Gemini

// Nuevo controlador para el chat conversacional
export const askChat = async (req, res) => {
try {
 // 1. Esperar la clave 'prompt' (o 'message', debes elegir una)
const { prompt } = req.body; 
const id_agricultor = req.user.id_agricultor; // Aún puedes usar esto para contexto, si es necesario

if (!prompt) {return res.status(400).json({ error: "Faltan datos requeridos: 'prompt'" });}
// 2. Definir el contexto del sistema (System Prompt)
// //    Esto limita al LLM al tema de agricultura.
const systemInstruction = "Eres un asistente de IA experto en agricultura, cultivos, fertilizantes, y técnicas de siembra. Responde solo preguntas relacionadas con la agronomía y gestión agrícola. Si la pregunta está fuera de este tema, responde educadamente que tu función está limitada a la agricultura.";
const respuestaLLM = await invokeGemini(prompt, systemInstruction); 
    // Nota: La función invokeGemini debe poder aceptar el 'systemInstruction'

// 4. Devolver la respuesta al frontend
res.json({
 reply: respuestaLLM, // Clave que espera tu servicio Angular
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