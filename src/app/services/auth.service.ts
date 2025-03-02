import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users/users.service';
import { CartService} from './cart/cart.service';
import { ToastService } from './toast/toast.service';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;

    constructor(
      private router: Router,
      private usersService: UsersService,
      private cartService: CartService,
      private toastService: ToastService
    ) {}

    login(username: string, password: string): Promise<boolean> {
      return firstValueFrom(
        this.usersService.getUserByCredentials(username, password).pipe(
          map((user: any) => {
            // Si el usuario existe y no está bloqueado
            sessionStorage.setItem('user', JSON.stringify(user));
            this.isAuthenticated = true;
            this.router.navigate(['/home']);
            return true;
          }),
          catchError((error) => {
            console.log(error);

            if (error.status === 403) {
              this.toastService.show('error', 'Error', error.error.error);
            } else if (error.status === 401 || error.status === 404) {
              this.toastService.show('error', 'Inicio fallido', 'Usuario o contraseña incorrectos.');
            } else {
              this.toastService.show('error', 'Error en la solicitud', 'Intente nuevamente.');
            }

            this.isAuthenticated = false;
            return of(false);
          })
        )
      );
    }


    logout(): void {
      this.isAuthenticated = false;
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
      return this.isAuthenticated;
    }

    register(email: string, password: string): boolean {
      if (email && password && email.includes('@')) {
        return true;
      }
      return false;
    }
}
