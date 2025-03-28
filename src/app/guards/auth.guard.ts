import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { LocalStorageService } from '@services/local-storage/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authKey = inject(AuthService).getKey();
  const isLoggin = inject(AuthService).checkAuthByUsername(authKey);
  
  if (isLoggin) {
    return true
  } else {
    inject(LocalStorageService).removeAll();
    return inject(Router).navigate(['login']);
  }
};
