AgroSage - Solución Digital Inteligente para el Sector Agrícola
Solución digital inteligente que ofrece recomendaciones personalizadas, gestiona planes de siembra y organiza tareas con integración de calendario para agricultores del sector rural.

🎯 Propósito del Proyecto
Implementar una solución digital inteligente que:

Ofrezca recomendaciones agrícolas personalizadas

Gestione planes de siembra y actividades

Organice tareas con integración de calendario

Facilite la planificación y mejore la productividad de agricultores

Objetivos Específicos
Análisis: Examinar la estructura del sistema y la interacción del agricultor con el asistente para definir una solución clara y funcional

Desarrollo: Construir el asistente inteligente que genere recomendaciones agrícolas personalizadas, integrando calendario y propuestas de comercialización

Evaluación: Verificar la precisión de las recomendaciones y la utilidad de los canales de comercialización sugeridos

👥 Público Objetivo
Agricultores y asociaciones del sector rural

Asistentes técnicos agropecuarios

Instituciones de apoyo al agro

Equipo de desarrollo y mantenimiento de la plataforma

🏗️ Arquitectura del Sistema
AgroSage está compuesto por dos componentes principales trabajando en conjunto:

Backend (Node.js + Express + MySQL)
Tecnologías: Node.js, Express 5.x, MySQL 8.x, Sequelize ORM

Autenticación: JWT con bcryptjs para hash de contraseñas

IA Integrada: Google Gemini y AWS Bedrock Runtime

API: RESTful endpoints

Base de datos: MySQL con modelos para agricultores, parcelas, planes de siembra, tareas, catálogos y más

Frontend (Ionic + Angular + Capacitor)
Tecnologías: Ionic 8 + Angular 20, Capacitor 7

Interfaz: Componentes móviles con experiencia tipo WhatsApp

Características: Chat inteligente, integración con calendario, gestión de tareas

Multiplataforma: Web y aplicaciones móviles nativas

🛠️ Stack Tecnológico Completo
Backend
javascript
{
  "Runtime": "Node.js (ES Modules)",
  "Framework": "Express 5.x",
  "Base de datos": "MySQL 8.x con mysql2",
  "ORM": "Sequelize 6.x",
  "Autenticación": "JWT (jsonwebtoken) + bcryptjs",
  "Seguridad": "CORS, dotenv para variables de entorno",
  "IA": "Google Generative AI / Gemini + AWS Bedrock Runtime",
  "APIs": "node-fetch para consumo de servicios externos"
}
Frontend
javascript
{
  "Framework": "Angular 20 (CLI, Router, HttpClient)",
  "UI Framework": "Ionic 8 (componentes UI, estrategia de rutas)",
  "Mobile": "Capacitor 7 (empaquetado móvil)",
  "Estado": "RxJS 7, Zone.js",
  "Estilos": "SCSS global + variables de tema Ionic"
}
Requisitos mínimos:

Node.js v18.19+ (o v20+)

npm 9+ (recomendado)

MySQL 8.x con una base de datos creada y accesible

📁 Estructura Completa del Proyecto
Backend (back-end-agro-sage/)
text
├── app.js                    # Configuración servidor Express, conexión BD, middlewares
├── config/
│   └── db.js                # Inicialización Sequelize y variables de entorno
├── controllers/              # Lógica de endpoints
│   ├── agricultoresController.js  # Registro y login
│   ├── planController.js          # Generación plan agrícola con IA (Gemini)
│   └── llmController.js           # Chat con AWS Bedrock (ejemplo)
├── middlewares/
│   └── token.js             # Generación y validación JWT (x-token headers)
├── models/                   # Modelos de dominio y relaciones (Sequelize)
│   ├── Agricultor.js        # Datos agricultor y credenciales (contraseña hasheada)
│   ├── Parcela.js           # Parcelas del agricultor
│   ├── PlanSiembra.js       # Planes de siembra
│   ├── TareaPlan.js         # Tareas del plan
│   ├── SuelosCatalogo.js    # Catálogo de suelos
│   ├── InsumosCatalogo.js   # Catálogo de insumos
│   ├── PreciosMercado.js    # Precios de mercado
│   ├── RegistroClima.js     # Registros climáticos
│   ├── Recomendacion.js     # Recomendaciones del sistema
│   └── index.js             # Exporta modelos y define asociaciones
└── routes/                   # Definición de rutas
    ├── agricultores.js       # Rutas registro/login/perfil
    └── plan.routes.js        # Ruta generación plan (protegida por JWT)
Frontend (ionic-frontend/)
text
src/
├── app/
│   ├── pages/
│   │   ├── login/                   # Pantalla autenticación
│   │   └── chat-agent-weather/      # Chat tipo WhatsApp con GaIA
│   ├── services/
│   │   ├── back-service.ts          # Consumo API Agricultores (login, perfil)
│   │   └── weather-service.ts       # Servicio consultas clima y pronóstico
│   ├── app.routes.ts               # Rutas y navegación (lazy loading)
│   └── app.config.ts               # Configuración aplicación
├── environments/                   # Configuración por entornos
│   ├── environment.ts              # Desarrollo
│   └── environment.prod.ts         # Producción
├── theme/
│   └── variables.scss              # Variables SCSS
├── global.scss                     # Estilos globales
└── main.ts                         # Bootstrap aplicación y proveedores
🗄️ Modelos de Base de Datos
Modelos Principales (Sequelize)
Agricultor: Datos del agricultor y credenciales (contraseña almacenada hasheada con bcrypt)

Parcela, PlanSiembra, TareaPlan: Entidades para planificación agrícola y tareas

SuelosCatalogo, InsumosCatalogo: Catálogos de referencia

PreciosMercado, RegistroClima, Recomendacion: Soporte para contexto del plan y análisis

Relaciones Destacadas
Agricultores tiene muchas Parcelas

PlanSiembras tiene muchas TareasPlan

⚙️ Configuración
Variables de Entorno Backend (.env)
env
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
Configuración de Entornos Frontend
Desarrollo (src/environments/environment.ts):

typescript
export const environment = {
  production: false,
  urlLocal: "http://172.18.0.148:8080",
  apiBase: "http://172.18.0.148:8080",
  apiAgricultores: "http://172.18.0.148:8080/AgroSage/Agricultores",
};
Producción (src/environments/environment.prod.ts):

typescript
export const environment = {
  production: true,
  apiBase: "http://172.18.0.148:8080",
  apiAgricultores: "http://172.18.0.148:8080/AgroSage/Agricultores",
};
Nota: Angular reemplaza automáticamente environment.ts por environment.prod.ts en builds de producción

🚀 Instalación y Ejecución
Backend
Clonar y configurar:

bash
cd back-end-agro-sage
cp .env.example .env  # Ajustar variables según tu entorno
Instalar dependencias:

bash
npm install
Iniciar servidor:

bash
node app.js
Servidor disponible en: http://localhost:3000

Frontend
Instalar dependencias:

bash
npm install
Ejecutar en desarrollo:

bash
npm start
Aplicación disponible en: http://localhost:4200/

Compilar para producción:

bash
npm run build
Salida en directorio www/

📡 Endpoints Principales del Backend
Base URL: http://localhost:3000/AgroSage

Autenticación de Agricultores
POST /Agricultores/registro

Body: { "nombre_completo", "cedula", "telefono_movil", "direccion", "barrio_vereda", "ciudad", "departamento", "municipio", "contrasena" }

Respuesta: Datos del agricultor creado (sin contraseña)

POST /Agricultores/login

Body: { "cedula", "contrasena" }

Respuesta: { "token": JWT, ...datos_agricultor }

GET /Agricultores/perfil 🔐

Header: x-token: <JWT>

Respuesta: Datos completos del agricultor autenticado

Plan Agrícola Asistido por IA
POST /Plan/generate-plan 🔐

Header: x-token: <JWT>

Funcionalidad: Compone contexto con parcelas, costos, precios de mercado y clima reciente, solicita a Gemini un plan en formato JSON

Respuesta: { plan: { ... } } y crea tareas en tareas_plan

Utilidades
GET /ping

Respuesta: { "message": "Servidor AgroSage activo ✅" }

📱 Páginas y Funcionalidades Frontend
1) Login
Autenticación de agricultores usando cédula y contraseña

Validación de datos mínimos de entrada

Navegación automática a chat principal en caso de éxito

2) Chat con GaIA (chat-agent-weather)
Interfaz estilo WhatsApp con burbujas diferenciales para usuario y agente

Mensaje inicial de presentación del agente inteligente

Envío de texto mediante input inferior y respuesta simulada del agente

Arquitectura preparada para integración con servicios reales de clima, planes y calendario

🔧 Servicios Frontend
BackService (src/app/services/back-service.ts)
Integración con backend Express de "Agricultores"

Utiliza environment.apiAgricultores como base URL

Métodos principales:

login(cedula, contrasena): POST a /AgroSage/Agricultores/login

getPerfil(): GET protegido con token a /AgroSage/Agricultores/perfil

Gestión de estado en memoria: isLoggedIn, token, currentUser

WeatherService (src/app/services/weather-service.ts)
Servicio de utilidades para consulta de clima y pronóstico

Diseñado para consumir proveedores de clima externos

Capacidad para mostrar condiciones actuales y pronósticos extendidos

🔐 Autenticación JWT
Flujo de Autenticación
Login: Agricultor envía cédula y contraseña

Validación: Backend verifica credenciales y genera JWT

Respuesta: Frontend recibe token y datos básicos

Sesión: Token se almacena en memoria (puede persistirse en localStorage/Storage)

Peticiones protegidas: Header x-token con JWT en cada request

Middleware de Validación
El backend incluye middleware validarJWT que:

Verifica la presencia y validez del token

Añade el objeto del agricultor autenticado a req

Permite acceso a endpoints protegidos

🤖 Integración con Inteligencia Artificial
Google Gemini (Text Bison)
Controlador: planController.js

Uso: Generación de planes agrícolas personalizados

Configuración: Variable GEMINI_API_KEY en .env

Flujo:

Recopila contexto (parcelas, clima, precios mercado)

Construye prompt estructurado

Llama API REST de Gemini (text-bison-001)

Parsea respuesta JSON y crea tareas en BD

AWS Bedrock Runtime (AI21 Jamba 1.5 Mini)
Controlador: llmController.js (ejemplo/en desarrollo)

Preparado para: Chat avanzado y recomendaciones

Requisitos:

Credenciales AWS válidas

Instalación: @aws-sdk/client-bedrock-runtime

Configuración región AWS

📱 Integración Móvil con Capacitor
Empacado para Dispositivos Móviles
bash
# Agregar plataforma Android
npx cap add android

# Agregar plataforma iOS
npx cap add ios

# Sincronizar cambios
npx cap sync

# Abrir proyecto nativo
npx cap open android
npx cap open ios
Características Móviles
UI nativa con componentes Ionic

Acceso a APIs del dispositivo (cámara, GPS, notificaciones)

Experiencia offline con potencial almacenamiento local

🧪 Calidad y Pruebas
Frontend
bash
# Análisis de código
npm run lint

# Tests unitarios
npm test

# Limpiar caché (en caso de problemas)
ng cache clean
Backend
Validaciones en controladores

Manejo centralizado de errores

Pruebas de integración con base de datos

❗ Resolución de Problemas Comunes
Error TS2339: "Property 'apiAgricultores' does not exist"
Verificar que src/environments/environment.ts define apiAgricultores

Confirmar import correcto en servicios: from '../../environments/environment'

Reiniciar servidor: Ctrl + C → npm start

Limpiar caché: ng cache clean → npm install

Problemas de CORS o Conexión API
Verificar que backend Express esté ejecutándose

Confirmar configuración CORS en backend

Ajustar apiBase y apiAgricultores en environment correctos

Verificar que IPs/puertos sean accesibles desde el frontend

Problemas de Base de Datos
Verificar variables de entorno en .env

Confirmar que MySQL esté ejecutándose

Validar credenciales de conexión

Ejecutar migraciones de modelos Sequelize si es necesario

🗺️ Roadmap y Futuras Mejoras
Próximas Funcionalidades
Chat Inteligente: Integración completa con motor de recomendaciones (LLM)

Clima en Tiempo Real: Conexión con servicios meteorológicos reales

Persistencia Segura: Almacenamiento robusto de tokens y guardas de ruta

Módulo de Planificación: Planes de siembra y tareas con calendario interactivo

Mercado Digital: Precios y propuestas de comercialización integradas

Internacionalización: Soporte multiidioma

Accesibilidad: Mejoras de accesibilidad WCAG

Mejoras Técnicas Pendientes
Scripts npm start unificados en package.json

Validaciones avanzadas en controladores backend

Sanitización de entrada de datos

Manejo de expiración y refresco de tokens JWT

Implementación de HTTPS para producción

Sistema de logging estructurado

Tests end-to-end

🛡️ Consideraciones de Seguridad
Implementadas
Autenticación JWT con secreto configurable

Hash de contraseñas con bcryptjs

Middleware de validación para rutas protegidas

Variables sensibles en entorno, no en código

CORS configurado para control de origenes

Recomendadas para Producción
HTTPS/SSL para todas las comunicaciones

Rate limiting para prevenir abuso

Validación exhaustiva de entrada de datos

Headers de seguridad (HSTS, CSP)

Almacenamiento seguro de secretos (Vault, KMS)

Auditoría regular de seguridad

🤝 Contribución al Proyecto
Guía de Desarrollo
Ramas: Usar feature branches para nuevas funcionalidades

Código: Seguir reglas de lint y estilo consistente

Pruebas: Añadir tests para nuevas funcionalidades

Documentación: Actualizar README para cambios relevantes

Commits: Mensajes descriptivos en commits

Estructura de Ramas
main - Versión estable de producción

develop - Desarrollo integrado

feature/nueva-funcionalidad - Desarrollo de features

hotfix/correccion-urgente - Correcciones críticas

📄 Licencia
Estado: Proyecto académico/MVP
Recomendación: Definir licencia antes de despliegue público (ej. MIT, Apache-2.0)

👏 Créditos y Agradecimientos
Equipo AGROSAGE - SENA Soft

Comunidad Ionic/Angular - Framework y componentes

Google Gemini - Capacidades de IA generativa

AWS Bedrock - Modelos de lenguaje avanzados

Comunidad Open Source - Todas las dependencias y herramientas utilizadas