# AGROSAGE Front-End (Ionic + Angular)

Solución digital inteligente para el sector agrícola que ofrece recomendaciones personalizadas, gestiona planes de siembra y organiza tareas con integración de calendario. Este repositorio contiene el cliente web (front-end) construido con Ionic 8 y Angular 20.

## Propósito del proyecto
Implementar una solución digital inteligente que:
- Ofrezca recomendaciones agrícolas personalizadas.
- Gestione planes de siembra y actividades.
- Organice tareas con integración de calendario.
- Facilite la planificación y mejore la productividad de agricultores del sector rural.

### Objetivos específicos
1. Analizar la estructura del sistema y la interacción del agricultor con el asistente para definir una solución clara y funcional.
2. Desarrollar el asistente inteligente que genere recomendaciones agrícolas personalizadas, integrando el calendario y mostrando propuestas de comercialización.
3. Evaluar el prototipo, verificando la precisión de las recomendaciones y la utilidad de los canales de comercialización sugeridos para el contexto agrícola local.

## Público objetivo
- Agricultores y asociaciones del sector rural.
- Asistentes técnicos agropecuarios.
- Instituciones de apoyo al agro.
- Equipo de desarrollo y mantenimiento de la plataforma.

## Tecnologías y dependencias
- Angular 20 (CLI, Router, HttpClient)
- Ionic 8 (componentes UI, estrategia de rutas)
- Capacitor 7 (configuración para empaquetado móvil)
- RxJS 7, Zone.js

Requisitos mínimos:
- Node.js v18.19+ (o v20+)
- npm 9+ (recomendado)

## Estructura general
- src/app/pages
  - login: pantalla de autenticación.
  - chat-agent-weather: chat tipo WhatsApp con GaIA (agente inteligente) y uso de servicios de clima.
- src/app/services
  - back-service.ts: consumo del API de “Agricultores” para login y perfil.
  - weather-service.ts: servicio para consultas de clima y pronóstico.
- src/app/app.routes.ts: rutas y navegación.
- src/main.ts: bootstrap de la aplicación y proveedores (HttpClient, Ionic, Router).
- src/environments: configuración de URLs del backend.
- src/theme y src/global.scss: estilos globales y variables.

## Arquitectura de la aplicación
- Enfoque de componentes standalone de Ionic/Angular.
- Router con rutas perezosas (lazy) para páginas principales.
- Servicios especializados para API del backend y clima.
- Integración de HttpClient a nivel global (provideHttpClient()).

## Páginas clave

### 1) Login
- Autenticación de agricultores usando cédula y contraseña.
- En caso de éxito, navegación a “/chat-agent-weather”.
- Valida datos mínimos de entrada.

### 2) Chat con GaIA (chat-agent-weather)
- Interfaz estilo WhatsApp con burbujas diferenciales para usuario y agente.
- Componente con mensaje inicial del agente.
- Envío de texto vía input inferior y respuesta simulada del agente.
- Preparada para integrar recomendaciones (clima, planes, calendario).

## Servicios

### BackService (src/app/services/back-service.ts)
- Integra el backend Express de “Agricultores”.
- Usa la base “environment.apiAgricultores”.
- Métodos:
  - login(cedula, contrasena): POST a /AgroSage/Agricultores/login
  - getPerfil(): GET protegido con token (x-token) a /AgroSage/Agricultores/perfil
- Gestión de estado simple en memoria: isLoggedIn, token, currentUser.

### WeatherService (src/app/services/weather-service.ts)
- Servicio de utilidades para consulta del clima y pronóstico.
- Diseñado para consumir un proveedor de clima, mostrar condiciones actuales y próximas (p. ej., 3 días).

## Configuración de entorno (src/environments)
Ajusta las URLs del backend según tu despliegue:

Desarrollo (environment.ts):
```
export const environment = {
  production: false,
  urlLocal: "http://172.18.0.148:8080",
  apiBase: "http://172.18.0.148:8080",
  apiAgricultores: "http://172.18.0.148:8080/AgroSage/Agricultores",
};
```

Producción (environment.prod.ts):
```
export const environment = {
  production: true,
  apiBase: "http://172.18.0.148:8080",
  apiAgricultores: "http://172.18.0.148:8080/AgroSage/Agricultores",
};
```

Nota: Angular reemplaza environment.ts por environment.prod.ts en builds de producción (angular.json → fileReplacements).

## Consumo del backend
Base montada en Express: `/AgroSage/Agricultores`
- POST /registro — registro de agricultor.
- POST /login — autenticación, devuelve token JWT.
- GET /perfil — protegido por JWT (encabezado `x-token`).

Ejemplo de uso en BackService:
```
this.http.post(`${environment.apiAgricultores}/login`, { cedula, contrasena })
  .subscribe(...);
```
Para rutas protegidas:
```
const headers = new HttpHeaders({ 'x-token': token });
this.http.get(`${environment.apiAgricultores}/perfil`, { headers });
```

## Puesta en marcha
1) Instala dependencias:
```
npm install
```
2) Ejecuta en desarrollo:
```
npm start
```
- Servidor local: http://localhost:4200/

3) Compila para producción:
```
npm run build
```
- Salida en `www/` (según angular.json).

## Integración móvil (Capacitor)
- Este proyecto incluye configuración de Capacitor (capacitor.config.ts). Para empaquetar:
  - Agrega plataforma: `npx cap add android` o `npx cap add ios`.
  - Sincroniza cambios: `npx cap sync`.
  - Abre el proyecto nativo: `npx cap open android` o `npx cap open ios`.

## Estilos y diseño
- Ionic e Ionicons para UI coherente en móvil y web.
- Estilos globales (`global.scss`) y variables (`theme/variables.scss`).
- Chat con estilos personalizados y soporte de modo oscuro.

## Calidad y pruebas
- Lint: `npm run lint`
- Tests unitarios: `npm test`

## Seguridad
- Autenticación JWT contra backend.
- El token se mantiene en memoria (ejemplo); se puede persistir en `localStorage` o `Storage` de Capacitor según necesidades.
- Para producción, añade manejo de expiración, refresco de token y guardas de ruta (ej. `loginGuard`).

## Rutas principales (src/app/app.routes.ts)
- `/login`: autenticación.
- `/chat-agent-weather`: chat principal (puede protegese con `loginGuard`).
- Redirección raíz `''` → `/chat-agent-weather`.

## Resolución de problemas
- Error TS2339: "Property 'apiAgricultores' does not exist on type ...":
  - Verifica que `src/environments/environment.ts` define `apiAgricultores`.
  - Asegura que el import en servicios es `from '../../environments/environment'` y que guardaste el archivo.
  - Reinicia el servidor de desarrollo (`Ctrl + C` y `npm start`).
  - Limpia caché de Angular si persiste: `ng cache clean` e instala de nuevo.

- CORS o fallos de API:
  - Asegúrate de que el backend Express esté corriendo y permita CORS.
  - Ajusta `apiBase` y `apiAgricultores` al host/puerto correctos.

## Roadmap sugerido
- Conectar el chat con el motor de recomendaciones (LLM) y servicios de clima reales.
- Persistencia segura del token y guardas de ruta activas.
- Módulos para planes de siembra y tareas con calendario interactivo.
- Vista de mercado: precios y propuestas de comercialización.
- Internacionalización y accesibilidad.

## Contribución
- Usa ramas para nuevas funcionalidades.
- Sigue las reglas de lint y añade pruebas cuando sea posible.
- Documenta cambios relevantes en este README.

## Licencia
- No especificada. Definir licencia antes de despliegue público (ej. MIT, Apache-2.0).

## Créditos
- Equipo AGROSAGE (SENA Soft) y comunidad Ionic/Angular.