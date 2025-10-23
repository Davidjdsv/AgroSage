// services/bedrockService.js
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Configuración del cliente usando accessKey y secretKey
const client = new BedrockRuntimeClient({
  region: "us-east-1", // Cambia si tu modelo Bedrock está en otra región
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

/**
 * Invoca un modelo LLM en AWS Bedrock
 * @param {string} prompt - Prompt del usuario
 * @param {string} modelId - ID del modelo de Bedrock a usar
 * @returns {Promise<string>} - Texto generado por el modelo
 */
export async function invokeBedrock(prompt, modelId) {
  const command = new InvokeModelCommand({
    modelId,
    body: JSON.stringify({
      inputText: prompt
    }),
    contentType: "application/json"
  });

  try {
    const response = await client.send(command);
    const responseBody = await new Response(response.body).json();
    // Dependiendo del modelo, la ruta del texto puede cambiar
    return responseBody?.outputText || "No se obtuvo respuesta del modelo";
  } catch (error) {
    throw new Error(`Error al invocar Bedrock: ${error.message}`);
  }
}
