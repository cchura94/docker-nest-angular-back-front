import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // console.log("AUTHGUARD *** ", route, state);

  const router = inject(Router)

  const token = localStorage.getItem('access_token') || null;

  if(!token){
    router.navigate(["/auth/login"]);
    return false;
  }

  return true;
};
