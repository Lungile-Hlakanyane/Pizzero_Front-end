import { CanActivateFn } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const user = authService.getUser();
  
    if (user.role === 'admin') {
      return true;  
    } else {
      router.navigate(['/login']); 
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }

};
