import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthService);

  if (!authService.isTokenExist()) {
    authService.showMustLogInAlert();
    router.navigate(['/']);
    return false;
  }
  return true;
};
