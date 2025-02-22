import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {

  }

}
