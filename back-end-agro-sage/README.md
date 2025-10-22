# AgroSage — Backend

Backend del MVP AgroSage construido con Node.js, Express y MySQL usando Sequelize como ORM. Expone endpoints REST para registro/autenticación de agricultores, generación de planes agrícolas asistidos por IA, y utilidades básicas.

## Tecnologías principales

- Node.js (ES Modules)
- Express 5.x (middlewares: `express.json`, `cors`, estáticos)
- MySQL 8.x (conector `mysql2`)
- Sequelize 6.x (ORM)
- Autenticación JWT (`jsonwebtoken`) con middleware de validación
- Hash de contraseñas con `bcryptjs`
- Variables de entorno con `dotenv`
- CORS con `cors`
- Consumo de APIs externas con `node-fetch`
- Integración IA:
  - Google Generative AI / Gemini (Text Bison)
  - AWS Bedrock Runtime (modelo AI21 Jamba 1.5 Mini)

## Estructura del proyecto

- `app.js`: configuración del servidor Express, conexión a BD, middlewares y montaje de rutas.
- `config/db.js`: inicialización de Sequelize y lectura de variables de entorno.
- `controllers/`: lógica de endpoints.
  - `agricultoresController.js`: registro y login.
  - `planController.js`: generación de plan agrícola con soporte de IA (Gemini).
  - `llmController.js`: controlador de chat con AWS Bedrock (en desarrollo/ejemplo).
- `middlewares/`:
  - `token.js`: generación y validación de JWT (`x-token` en headers).
- `models/`: modelos de dominio y relaciones (Sequelize).
  - `Agricultor.js`, `Parcela.js`, `PlanSiembra.js`, `TareaPlan.js`, `SuelosCatalogo.js`, `InsumosCatalogo.js`, `PreciosMercado.js`, `RegistroClima.js`, `Recomendacion.js`.
  - `index.js`: exporta modelos y define asociaciones.
- `routes/`:
  - `agricultores.js`: rutas de registro/login/perfil.
  - `plan.routes.js`: ruta de generación de plan (protegida por JWT).

## Base de datos

Se utiliza MySQL con Sequelize. Variables de entorno definen conexión y credenciales.

Modelos principales:
- `Agricultor`: datos del agricultor y credenciales (contraseña almacenada hasheada con bcrypt).
- `Parcela`, `PlanSiembra`, `TareaPlan`: entidades para planificación agrícola y tareas.
- `SuelosCatalogo`, `InsumosCatalogo`: catálogos de referencia.
- `PreciosMercado`, `RegistroClima`, `Recomendacion`: soporte para contexto del plan y análisis.

Relaciones destacadas (ver `models/index.js`):
- `Agricultores` tiene muchas `Parcelas`.
- `PlanSiembras` tiene muchas `TareasPlan`.

## Variables de entorno (.env)

Ejemplo mínimo:

```
# Servidor
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=agrosage
DB_USER=root
DB_PASSWORD=tu_password

# JWT
JWT_SECRET=supersecretjwt
JWT_TIME=24h

# IA (Gemini)
GEMINI_API_KEY=tu_api_key_de_gemini

# AWS (Bedrock)
AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
AWS_REGION=us-east-1
```

Notas:
- `config/db.js` usa `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.
- El controlador `planController.js` llama a la API REST de Gemini (modelo `text-bison-001`) usando `GEMINI_API_KEY`.
- `llmController.js` está preparado para AWS Bedrock con AI21 Jamba; necesita credenciales AWS válidas y las importaciones del SDK.

## Instalación y ejecución

Requisitos previos:
- Node.js 18+ (recomendado 20+)
- MySQL 8.x con una base de datos creada y accesible.

Pasos:
1. Clonar el repositorio y ubicarse en `back-end-agro-sage`.
2. Crear archivo `.env` con las variables anteriores.
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Iniciar el servidor:
   ```bash
   node app.js
   ```
   El servidor levantará en `http://localhost:3000` (o el puerto definido).

## Endpoints principales

Base path: `http://localhost:3000/AgroSage`

- Autenticación de agricultores (`routes/agricultores.js`):
  - `POST /Agricultores/registro`
    - Body JSON: `nombre_completo`, `cedula`, `telefono_movil`, `direccion`, `barrio_vereda`, `ciudad`, `departamento`, `municipio`, `contrasena`.
    - Respuesta: datos del agricultor creado (sin contraseña).
  - `POST /Agricultores/login`
    - Body JSON: `cedula`, `contrasena`.
    - Respuesta: token JWT (`token`), datos básicos del agricultor.
  - `GET /Agricultores/perfil` (protegido)
    - Header: `x-token: <JWT>`.
    - Respuesta: datos del agricultor autenticado.

- Plan agrícola asistido por IA (`routes/plan.routes.js`):
  - `POST /Plan/generate-plan` (protegido)
    - Header: `x-token: <JWT>`.
    - Internamente compone contexto con tus parcelas, costos, precios de mercado y clima reciente, y solicita a un modelo de IA (Gemini) un plan en formato JSON.
    - Respuesta: `{ plan: { ... } }` y crea tareas en `tareas_plan`.

- Utilidades:
  - `GET /ping` → `{ "message": "Servidor AgroSage activo ✅" }`

## Autenticación (JWT)

- Al hacer login, recibes un `token` (JWT). Inclúyelo en cada petición protegida usando el header `x-token`.
- El middleware `validarJWT` añade el agricultor al objeto `req` si el token es válido.

## Integración con IA

- `planController.js` llama a la API REST de Gemini (`text-bison-001`) para generar un plan agrícola. Configura `GEMINI_API_KEY` en `.env`.
- `llmController.js` ejemplifica una integración de chat con AWS Bedrock (AI21 Jamba 1.5 Mini). Para usarlo:
  - Asegúrate de tener `@aws-sdk/client-bedrock-runtime` y credenciales AWS.
  - Importa en el archivo el cliente y comando del SDK:
    ```js
    import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
    ```
  - Define la ruta en `routes/` y monta en `app.js` (actualmente no hay ruta expuesta para este controlador).

## Notas y mejoras pendientes

- Revisión de nombres y exportaciones de modelos: asegúrate de usar los mismos nombres (`Agricultores` vs `Agricultor`) al importar desde `models/index.js` o archivos individuales.
- Agregar script `start` en `package.json` para ejecutar con `npm start`:
  ```json
  {
    "scripts": { "start": "node app.js" }
  }
  ```
- Añadir validaciones adicionales en controladores y sanitización de entrada.
- Considerar HTTPS y almacenamiento seguro de secretos.

## Licencia

Proyecto académico/MVP. Ajusta la licencia según tus necesidades.