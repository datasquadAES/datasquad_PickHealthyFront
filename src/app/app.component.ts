import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
        }
      });
    }

    ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
              route: '/home'
          },
          {
              label: 'Orders',
              icon: 'pi pi-users',
              route: 'orders'
          },
          {
              label: 'Home - dealer',
              icon: 'pi pi-users',
              route: '/dealer'
          },
          // {
          //     label: 'Users',
          //     icon: 'pi pi-users',
          //     route: 'users'
          // },
          // {
          //     label: 'Projects',
          //     icon: 'pi pi-search',
          //     items: [
          //         {
          //             label: 'Components',
          //             icon: 'pi pi-bolt'
          //         },
          //         {
          //             label: 'Blocks',
          //             icon: 'pi pi-server'
          //         },
          //         {
          //             label: 'UI Kit',
          //             icon: 'pi pi-pencil'
          //         },
          //         {
          //             label: 'Templates',
          //             icon: 'pi pi-palette',
          //             items: [
          //                 {
          //                     label: 'Apollo',
          //                     icon: 'pi pi-palette'
          //                 },
          //                 {
          //                     label: 'Ultima',
          //                     icon: 'pi pi-palette'
          //                 }
          //             ]
          //         }
          //     ]
          // },
          // {
          //     label: 'Contact',
          //     icon: 'pi pi-envelope'
          // }
      ]
    }

    logout() {
      this.authService.logout();
    }

    openCart(){
      this.cartService.showCart();
    }



}
