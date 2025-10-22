import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// --- Configuración del Cliente de AWS Bedrock ---
const REGION = "us-east-1"; 
const MODEL_ID = "ai21.jamba-1-5-mini-v1:0"; 
//------------------------------------------------

/**
 * Controlador de chat usando AWS Bedrock (modelo AI21 Jamba 1.5 Mini)
 * Espera body: { message: string }
 */
export const postChat = async (req, res) => {
  const { message } = req.body;

  //Validación del mensaje
  if (!message || typeof message !== "string") {
    return res.status(400).json({
      error: "Se espera un mensaje de texto",
    });
  }

  try {
    //Crear cliente Bedrock Runtime ¡
    const client = new BedrockRuntimeClient({ region: REGION });

    //Crear el cuerpo de la solicitud
    const input = {
      messages: [
        { role: "system", content: "You are a concise and helpful assistant." },
        { role: "user", content: message },
      ],
      max_output_tokens: 100, // Límite de tokens de salida
      temperature: 0.2, // Control de creatividad
    };

    // 4. Preparar el comando para el modelo
    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      body: JSON.stringify(input),
      contentType: "application/json",
      accept: "application/json",
    });

    //Enviar solicitud al modelo
    const response = await client.send(command);

    //Procesar respuesta
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const content =
      responseBody?.output_text ||
      responseBody?.completions?.[0]?.data?.text ||
      JSON.stringify(responseBody);

    return res.json({ reply: content });
  } catch (error) {
    console.error("Error en postChat:", error);
    return res.status(500).json({
      error: "Error al comunicarse",
      details: error.message,
    });
  }
};
