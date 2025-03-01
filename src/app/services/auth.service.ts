import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users/users.service';
import { CartService} from './cart/cart.service';
import { ToastService } from './toast/toast.service';

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

    login(username: string, password: string) {
      let isLoggedIn = false;
      this.usersService.getUserByCredentials(username, password).subscribe((user: any) => {

        if (user && user.username === username && user.password === password) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.isAuthenticated = true;
        isLoggedIn = true;
        this.router.navigate(['/home']);
        } else {
          this.toastService.show('error', 'Usuario no encontrado', 'Intente nuevamente');
        this.isAuthenticated = false;
        isLoggedIn = false;
        }
      });

      return isLoggedIn;
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
