import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const isLoggedIn = sessionStorage.getItem('user');

    if (isLoggedIn) {
      return true;
    } else {
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
