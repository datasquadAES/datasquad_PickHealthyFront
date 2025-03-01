import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api/menuitem';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user: any = {};

  constructor(private authService: AuthService,
    private router : Router
  ) {
    this.router.events.subscribe((event:any) => {
      // if (event instanceof NavigationEnd && event.url === '/login' && !sessionStorage.getItem('user')) {
      //   sessionStorage.removeItem('user');  // Limpia los datos de sesión
      // }
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if(user){
      this.user = JSON.parse(user) ;
    }
  }

}
