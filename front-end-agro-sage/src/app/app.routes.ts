import { Routes } from '@angular/router';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/chat-agent-weather',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'chat-agent-weather',
    canActivate: [loginGuard],
    loadComponent: () => import('./pages/chat-agent-weather/chat-agent-weather.page').then((m) => m.ChatAgentWeatherPage),
  },
];
