import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showSignup: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.showSignup = this.router.url === '/signup';

  }


  toggleSignup() {
    this.showSignup = !this.showSignup;
    this.errorMessage = '';
    this.router.navigate([this.showSignup ? '/signup' : '/login']);
  }

  onSubmit() {
    const isLoggedIn = this.authService.login(this.email, this.password);

    if (!isLoggedIn) {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
