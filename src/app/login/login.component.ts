import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService) {}

  onSubmit() {
    const isLoggedIn = this.authService.login(this.email, this.password);

    if (!isLoggedIn) {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
