import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  errorMessage: string = ' ';
  showSignup: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,

  ) {
    this.showSignup = this.router.url === '/signup';

  }

  ngOnInit(): void {
    // sessionStorage.removeItem('user');

  }


  ngAfterViewInit(): void {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }


  toggleSignup() {
    this.showSignup = !this.showSignup;
    this.errorMessage = '';
    this.router.navigate([this.showSignup === true ? '/signup' : '/login']);
  }

  async onSubmit() {
    this.loading = true;
    const isLoggedIn = await this.authService.login(this.email, this.password);

    if (!isLoggedIn) {
      this.toastService.show('error', 'Inicio fallido', 'Intente nuevamente');
      this.loading = false
      this.errorMessage = 'Inicio fallido. Intente nuevamente.';
    }
  }
}
