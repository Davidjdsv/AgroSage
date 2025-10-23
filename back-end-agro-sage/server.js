import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import planRoutes from "./routes/planRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/aiRoutes.js"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 👇 Montamos las rutas con su prefijo
app.use("/api/auth", authRoutes);
app.use("/api/plan", planRoutes);

// 🚀 Montamos las rutas de Chat
// Esto mapea la ruta '/ask' dentro de chatRoutes a '/api/chat/ask'
app.use("/api/chat", chatRoutes); 

// Inicias servidor
app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Servidor corriendo en puerto ${process.env.PORT || 5000}`);
});
