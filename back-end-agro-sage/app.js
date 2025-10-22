import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import RouterAgricultores from "./routes/agricultores.js";
import RouterPlanes from "./routes/plan.routes.js"; // el router de generate-plan

dotenv.config();

async function connectDB() {
    try {
        // Authenticate the connection
        await sequelize.authenticate(); 
        console.log('✅ Conexión a la base de datos establecida correctamente.');
        
        // Optional: Synchronize models (usually done only in dev environments)
        // await sequelize.sync({ alter: true }); 
    } catch (error) {
        console.error('❌ Error al conectar o autenticar la base de datos:', error);
    }
}

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Rutas
// Rutas de registro, login y perfil
app.use("/AgroSage/Agricultores", RouterAgricultores);

// Rutas del plan agrícola
app.use("/AgroSage/Plan", RouterPlanes);

// Ruta de prueba
app.get("/AgroSage/ping", (req, res) => {
  res.json({ message: "Servidor AgroSage activo ✅" });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
