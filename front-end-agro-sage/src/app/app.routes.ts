import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/chat-agent-weather',
    pathMatch: 'full',
  },
  {
    path: 'chat-agent-weather',
    loadComponent: () => import('./pages/chat-agent-weather/chat-agent-weather.page').then( m => m.ChatAgentWeatherPage)
  },

];
