import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const teamGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthService);

  if (authService.user()?.teamId != route.paramMap.get('teamId')) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
