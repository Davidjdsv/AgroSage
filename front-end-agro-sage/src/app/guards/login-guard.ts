import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BackService } from '../services/back-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const backService = inject(BackService);
  const router = inject(Router);

  // Si está logueado, permite el acceso a la ruta solicitada
  if (backService.isLoggedIn) {
    return true;
  }
  // Si NO está logueado, redirige al login
  return router.createUrlTree(['/login']);
};
