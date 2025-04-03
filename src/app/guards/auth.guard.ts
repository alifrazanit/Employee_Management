import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authKey = inject(AuthService).getKey();
  const authService = inject(AuthService);

  const isLoggin = authService.checkAuthByUsername(authKey);
  if(isLoggin){
    return true
  } else {
    return inject(Router).navigate(['login']);
  }
};
