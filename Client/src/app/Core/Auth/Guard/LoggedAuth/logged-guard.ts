import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Service/auth';

export const loggedGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuth = auth.isAuth();

  if(!isAuth) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
