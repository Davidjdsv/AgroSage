// Archivo: services/geminiService.js

import fetch from "node-fetch";

/**
 * Invoca la API de Gemini para generar contenido.
 * @param {string} prompt El mensaje del usuario.
 * @param {string | null} system_instruction La instrucción del sistema para guiar al modelo. // Corregido: system_instruction
 * @returns {Promise<string>} La respuesta del modelo de IA.
 */
export async function invokeGemini(prompt, system_instruction = null) { // Corregido: system_instruction en el parámetro
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // Nombre de modelo compatible con el endpoint v1beta para Gemini 1.5 Flash
    const MODEL_NAME = "gemini-1.5-flash-latest";

    // Estructura de la solicitud
    const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
        // Debe ser 'generationConfig' para systemInstruction en v1beta
        generationConfig: {} 
    };

    // CORRECCIÓN CLAVE DE LÓGICA: Ahora se comprueba la variable local 'system_instruction'
    if (system_instruction) { // Corregido: usar la variable local system_instruction
        // CORRECCIÓN CLAVE DE API: Se usa el nombre de campo esperado por la API (snake_case)
        requestBody.generationConfig.system_instruction = system_instruction; 
    }

    // Eliminar generationConfig si está vacío (opcional, pero más limpio)
    if (Object.keys(requestBody.generationConfig).length === 0) {
        delete requestBody.generationConfig;
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );

        const data = await response.json();

        // Manejar errores devueltos por la API (ej. API Key inválida, bloqueos, etc.)
        if (data.error) {
            // Lanza un error detallado que será capturado en el chatController
            throw new Error(data.error.message);
        }

        // Devolver la respuesta de texto
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No se obtuvo respuesta de la IA.";
        
    } catch (error) {
        // Re-lanza el error para ser manejado por el controlador
        throw new Error(error.message);
    }
}