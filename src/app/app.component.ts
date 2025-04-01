import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    items: any[] | undefined;
    isLoginRoute: boolean = false;

    constructor(
      private router: Router,
      private authService: AuthService,
      private cartService: CartService
    ) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isLoginRoute = event.url === '/login' || event.url === '/signup' || event.url === '/';
          this.initializeItems(); // Reinicializar items cuando cambia la ruta
        }
      });
    }

    private initializeItems() {
      const userStr = sessionStorage.getItem('user');

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const userType = user?.id_tipo_usuario;

          switch(userType) {
            case 1: // Cliente
              this.items = [
                {
                  label: 'Home',
                  icon: 'pi pi-home',
                  route: '/home'
                },
                {
                  label: 'Ordenes',
                  icon: 'pi pi-search',
                  route: 'orders'
                }
              ];
              break;
            case 2: // Restaurante
              this.items = [
                {
                  label: 'Home',
                  icon: 'pi pi-store',
                  route: '/restaurant'
                }
              ];
              break;
            case 3: // Repartidor
              this.items = [
                {
                  label: 'Home',
                  icon: 'pi pi-truck',
                  route: '/dealer'
                }
              ];
              break;
            default:
              this.items = [];
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          this.items = [];
        }
      } else {
        this.items = [];
      }
    }

    ngOnInit() {
      this.initializeItems();
    }

    logout() {
      this.authService.logout();
    }

    openCart() {
      this.cartService.showCart();
    }
}

