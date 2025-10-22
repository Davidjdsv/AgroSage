import express from "express"; // Importar el framework Express para crear el servidor
import dotenv from "dotenv"; // Importar dotenv para manejar variables de entorno desde el archivo .env
import cors from "cors";
import sequelize from './config/db.js';

// Importar las rutas definidas para diferentes entidades
import RouterAgricolas from './routes/agricultores.js'

dotenv.config(); // Cargar las variables de entorno del archivo .env a process.env
sequelize()

const app = express(); // Crear la instancia de la aplicación Express
app.use(express.json()); // Middleware: Permite que Express entienda datos en formato JSON en las peticiones
app.use(cors()); // Middleware: Habilita CORS para permitir peticiones desde frontends en otros dominios
app.use(express.static(`public`)); //sirve para decirle a Express que sirva archivos estáticos desde la carpeta public.


// Configurar las rutas de la API con sus respectivos endpoints
app.use('/AgroSage/Agricultores', RouterAgricolas);
//app.use('/AgroSage/', );
//app.use('/AgroSage/',);
//app.use('/AgroSage/', );

// Iniciar el servidor y hacer que escuche en el puerto especificado
app.listen(process.env.HOST, () => {
  console.log(`✅ Servidor corriendo en ${process.env.HOST}`);
});
