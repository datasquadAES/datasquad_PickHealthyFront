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
    const userStr = sessionStorage.getItem('user');

    if (!userStr) {
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userStr);
    const userType = user.id_tipo_usuario;
    const requestedPath = state.url;

    // Define allowed routes for each user type
    const allowedRoutes: Record<number, string[]> = {
      1: ['/home', '/orders'], // Cliente
      2: ['/restaurant'], // Restaurante
      3: ['/dealer'] // Repartidor
    };

    // Check if the requested path is allowed for the user type
    if (allowedRoutes[userType]?.some((route: string) => requestedPath.startsWith(route))) {
      return true;
    }

    // If the route is not allowed, redirect to the appropriate home based on user type
    switch(userType) {
      case 1:
        this.router.navigate(['/home']);
        break;
      case 2:
        this.router.navigate(['/restaurant']);
        break;
      case 3:
        this.router.navigate(['/dealer']);
        break;
      default:
        this.router.navigate(['/login']);
    }

    return false;
  }
}
