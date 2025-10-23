import { Routes } from '@angular/router';

/**
 * Define las rutas principales para la aplicación AgroSage.
 *
 * Incluye flujo de autenticación y flujo principal protegido.
 */
export const routes: Routes = [
  // 🟩 1. Redirección inicial: va directamente al login al abrir la app
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  // 🟢 2. RUTA DE AUTENTICACIÓN (Login / Registro)
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then((m) => m.AuthPage),
  },

  // 🟦 3. RUTAS PROTEGIDAS (Requieren login)
  {
    path: 'app',
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'chat-agent',
        loadComponent: () => import('./pages/chat/chat.page').then((m) => m.ChatPage),
      },
      // 🔁 Redirección interna: si entra solo a /app, lo lleva a /app/home
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },

  // 🔻 4. Ruta comodín: cualquier URL desconocida va al login
  {
    path: '**',
    redirectTo: 'auth',
  },
];
